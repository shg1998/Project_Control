using AutoMapper;
using Common;
using Common.Exceptions;
using Common.Utilities;
using Data;
using Data.Contracts;
using Entities.Role;
using Entities.User;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Services.Dtos.User;
using Services.Services.Auth;
using Services.Services.Common;
using Services.WebFramework.Pagination;

namespace Services.Services.User
{
    internal class UserService : IUserService, IScopedDependency
    {
        private const string ExcelFilesDirectoryName = "ExcelFiles";
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;
        private readonly UserManager<UserEntity> _userManager;
        private readonly IFileHandlerService _fileHandlerService;
        private readonly IWebHostEnvironment _environment;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserService(ApplicationDbContext dbContext, IMapper mapper, IUserRepository userRepository, ILogger<UserService> logger, IJwtService jwtService,
            UserManager<UserEntity> userManager, RoleManager<RoleEntity> roleManager, IFileHandlerService fileHandlerService, IWebHostEnvironment environment)
        {
            this._userRepository = userRepository;
            this._jwtService = jwtService;
            this._userManager = userManager;
            this._fileHandlerService = fileHandlerService;
            this._environment = environment;
            this._dbContext = dbContext;
            this._mapper = mapper;
        }

        public async Task CreateUser(CreateUserDto userDto, CancellationToken cancellationToken)
        {
            var userExists = await _dbContext
                .Set<UserEntity>()
                .SingleOrDefaultAsync(p => p.UserName == userDto.UserName || p.Email == userDto.Email, cancellationToken);

            if (userExists != null)
            {
                await _userManager.SetUserNameAsync(userExists, userDto.UserName);
                await _userManager.SetEmailAsync(userExists, userDto.Email);
                await this.ReturnUserAsNewUser(userExists, new UserDto
                {
                    Email = userDto.Email,
                    FullName = userDto.FullName,
                    IsActive = userDto.IsActive,
                    Password = userDto.Password,
                    UserName = userDto.UserName,
                }, cancellationToken);
            }
            else
            {
                var user = _mapper.Map<UserEntity>(userDto);
                //user.ImagePath = string.Empty;
                var result = await _userManager.CreateAsync(user, userDto.Password);
                var result3 = await _userManager.AddToRoleAsync(user, "User");
                if (!result.Succeeded || !result3.Succeeded)
                    throw new BadRequestException("There is a problem");
            }
        }

        public async Task RegisterUser(RegisterDto userDto, CancellationToken cancellationToken)
        {
            var userExists = await _dbContext
                .Set<UserEntity>()
                .SingleOrDefaultAsync(p => p.UserName == userDto.UserName || p.Email == userDto.Email, cancellationToken);

            if (userExists == null)
            {
                var user = new UserEntity
                {
                    FullName = userDto.FullName,
                    UserName = userDto.UserName,
                    Email = userDto.Email,
                    IsActive = false,
                };

                var result = await _userManager.CreateAsync(user, userDto.Password);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Aggregate(string.Empty, (current, identityError) => current + $" {identityError.Description}  * ");
                    throw new BadRequestException(errors);
                }
                var result3 = await _userManager.AddToRoleAsync(user, "User");
                if (!result3.Succeeded)
                    throw new BadRequestException("There is a problem");
            }
        }

        public async Task EditUserByAdmin(int userId, UserDto userDto, CancellationToken cancellationToken)
        {
            var userExists = await _dbContext
                .Set<UserEntity>()
                .SingleOrDefaultAsync(b => b.Id == userId, cancellationToken);

            if (userExists == null)
                throw new BadRequestException("There is a problem with the received data");

            await this.CheckForAdminAccessibility(userExists);
            await _userManager.SetUserNameAsync(userExists, userDto.UserName);
            await _userManager.SetEmailAsync(userExists, userDto.Email);
            await this.ReturnUserAsNewUser(userExists, userDto, cancellationToken);
        }

        public async Task<LoginResponseDto> EditUserByUser(int userId, EditUserDto userDto, CancellationToken cancellationToken)
        {
            var userExists = await _dbContext
                .Set<UserEntity>()
                .SingleOrDefaultAsync(b => b.Id == userId, cancellationToken);

            if (userExists == null)
                throw new BadRequestException("مشکلی در داده های دریافتی وجود دارد!");

            if (userDto.NewPassword != string.Empty && userDto.OldPassword != string.Empty)
            {
                var resultChangePassword =
                await this._userManager.ChangePasswordAsync(userExists, userDto.OldPassword, userDto.NewPassword);
                if (!resultChangePassword.Succeeded)
                    throw new BadRequestException("مشکلی در اعتبار اطلاعات دریافتی وجود دارد!");
            }
            var result = await _userManager.SetUserNameAsync(userExists, userDto.UserName);
            userExists.FullName = userDto.FullName;
            userExists.UserName = userDto.UserName;
            userExists.Email = userDto.Email;
            await _dbContext.SaveChangesAsync(cancellationToken);

            var userFinalDto = new LoginResponseDto
            {
                Email = userExists.Email,
                FullName = userExists.FullName,
                UserName = userExists.UserName,
                Token = await _jwtService.GenerateAsync(userExists)
            };
            var roles = await _userManager.GetRolesAsync(userExists);
            userFinalDto.UserRoleName = roles.Contains("Admin") ? "Admin" : roles.First();
            return userFinalDto;
        }

        public async Task UploadUserExcelFile(int userId, IFormFile file, CancellationToken cancellationToken)
        {
            var prevExcelPath = string.Empty;
            if (file != null)
            {
                var extension = Path.GetExtension(file.FileName);

                if (!ContentTypes.GetMimeTypes().Keys.Contains(extension.ToLower()))
                    throw new BadRequestException("فرمت فایل نامعتبر است !");

                var userExist = await _dbContext
                    .Set<UserEntity>()
                    .FirstOrDefaultAsync(s => s.Id == userId, cancellationToken);

                if (userExist == null)
                    throw new BadRequestException("مشکلی در دریافت داده های ارسالی وجود دارد.");

                if (userExist.ExcelPath != string.Empty)
                    prevExcelPath = userExist.ExcelPath;
                var split = file.FileName.Split('.');
                var fileName = $"{Guid.NewGuid().ToString()}.{split[^1]}";
                await this._fileHandlerService.AddFile(fileName, file, ExcelFilesDirectoryName, cancellationToken);
                userExist.ExcelPath = fileName;
                await _dbContext.SaveChangesAsync(cancellationToken);
                if (!prevExcelPath.IsNullOrEmpty()) this._fileHandlerService.DeleteFile(prevExcelPath, ExcelFilesDirectoryName);
            }
        }

        public async Task<string> DownloadUserExcelFile(int userId, CancellationToken cancellationToken)
        {
            var userExist = await _dbContext
                .Set<UserEntity>()
                .AsNoTracking()
                .AsSingleQuery()
                .FirstOrDefaultAsync(s => s.Id == userId, cancellationToken);

            if (userExist == null)
                throw new BadRequestException("مشکلی در دریافت داده های ارسالی وجود دارد.");

            if (userExist.ExcelPath.IsNullOrEmpty())
                throw new BadRequestException("این کاربر فایل ندارد .");

            var filePath = Path.Combine(this._environment.WebRootPath, "Files", ExcelFilesDirectoryName, userExist.ExcelPath);
            if (!File.Exists(filePath))
                throw new BadRequestException("!فایل کاربر یافت نشد");

            return userExist.ExcelPath;
        }

        public async Task DeleteUser(int userId, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(cancellationToken, userId);
            if (user == null)
                throw new NotFoundException("مشکلی پیش آمده!");

            await this.CheckForAdminAccessibility(user);
            await this._userManager.DeleteAsync(user);
        }

        public async Task<PagedQueryable<UserDisplayDto>> GetAllUsers(string? queries, CancellationToken cancellationToken)
        {
            //var query = _dbContext.Set<UserEntity>().AsNoTracking().Where(s => s.IsDeleted == false);
            var query = await this._userManager.GetUsersInRoleAsync("User");

            var queryable = query;

            var users = _mapper
                .ProjectTo<UserDisplayDto>(queryable.AsQueryable());

            if (users == null)
                throw new BadRequestException("داده ای یافت نشد.");

            var paginationParams = OdataUtils.GetSkipLimit(queries, query.AsQueryable());
            var result = new PagedQueryable<UserDisplayDto>
            {
                Data = users,
                CurrentPage = paginationParams.CurrentPageNumber,
                PageSize = paginationParams.Limit,
                TotalCount = paginationParams.TotalCount,
                TotalPages = (int)Math.Ceiling(paginationParams.TotalCount / (double)paginationParams.Limit)
            };
            return result;
        }

        public async Task<LoginResponseDto> Login(LoginDto loginDto, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null)
                throw new BadRequestException("نام کاربری یا رمز عبور اشتباه است.");

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordValid)
                throw new BadRequestException("Username Or Password is Invalid");

            if (!user.IsActive)
                throw new BadRequestException("!حساب کاربری شما منتظر تایید مدیر می باشد");

            var userDto = new LoginResponseDto
            {
                Email = user.Email,
                FullName = user.FullName,
                UserName = user.UserName,
                Token = await _jwtService.GenerateAsync(user)
            };
            var roles = await _userManager.GetRolesAsync(user);

            userDto.UserRoleName = roles.Contains("Admin") ? "Admin" : roles.First();

            return userDto;
        }

        private async Task ReturnUserAsNewUser(UserEntity userExists, UserDto userDto, CancellationToken cancellationToken)
        {
            var roles = await _userManager.GetRolesAsync(userExists);
            if (userDto.UserRoleName.IsNullOrEmpty())
            {
                if (roles.Contains("Admin"))
                    await _userManager.RemoveFromRoleAsync(userExists, "Admin");
                userDto.UserRoleName = "User";
            }
            if (!roles.Contains(userDto.UserRoleName))
            {
                var roleName = userDto.UserRoleName;
                var resultRole = await _userManager.AddToRoleAsync(userExists, roleName);
                if (!resultRole.Succeeded)
                    throw new BadRequestException("There is a problem");
            }

            if (userDto.Password != string.Empty)
            {
                var resultRemovePassword = await this._userManager.RemovePasswordAsync(userExists);
                var resultAddPassword = await this._userManager.AddPasswordAsync(userExists, userDto.Password);

                if (!resultAddPassword.Succeeded || !resultRemovePassword.Succeeded)
                    throw new BadRequestException("There is a problem");
            }

            userExists.IsActive = userDto.IsActive;
            userExists.FullName = userDto.FullName;
            userExists.LastLoginDate = null;
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        private async Task CheckForAdminAccessibility(UserEntity user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains("Admin"))
                throw new UnauthorizedAccessException("You Can't Access To This Operation");
        }
    }
}
