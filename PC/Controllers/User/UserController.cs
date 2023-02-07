using Common.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Services.Dtos.User;
using Services.Services.User;
using Services.WebFramework.Pagination;
using WebFrameworks.Filters;

namespace PC.Controllers.User
{
    [Route("api/[controller]")]
    [ApiResultFilter]
    [ApiController]
    public class UserController : ODataController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) => this._userService = userService;

        [EnableQuery]
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IQueryable<UserDisplayDto>> GetAllUsers(CancellationToken cancellationToken)
        {
            var queries = Request.QueryString.Value;
            var users = await this._userService.GetAllUsers(queries, cancellationToken);
            Response.AddPaginationHeader(users.TotalPages, users.PageSize, users.CurrentPage, users.TotalCount);
            return users.Data;
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateUser(CreateUserDto userDto, CancellationToken cancellationToken)
        {
            await this._userService.CreateUser(userDto, cancellationToken);
            return Ok("کاربر با موفقیت ایجاد شد");
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            await this._userService.DeleteUser(id, cancellationToken);
            return Ok("کاربر با موفقیت حذف شد");
        }

        [HttpPut("edit-user-by-admin/{userId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditByAdmin(int userId, UserDto userDto, CancellationToken cancellationToken)
        {
            await this._userService.EditUserByAdmin(userId, userDto, cancellationToken);
            return Ok("کاربر با موفقیت ویرایش شد");
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<LoginResponseDto> Login(LoginDto loginDto, CancellationToken cancellationToken)
        {
            var token = await this._userService.Login(loginDto, cancellationToken);
            return token;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterDto userDto, CancellationToken cancellationToken)
        {
            await this._userService.RegisterUser(userDto, cancellationToken);
            return Ok("ثبت نام شما با موفقیت انجام شد. پس از فعال شدن حساب کاربری تان توسط ادمین ، دسترسی شما به سیستم میسر خواهد شد");
        }

        [HttpPut("edit-user")]
        [Authorize(Roles = "Admin,User")]
        public async Task<LoginResponseDto> EditByUser(EditUserDto userDto, CancellationToken cancellationToken)
        {
            var userId = int.Parse(User.Identity.GetUserId());
            var result = await this._userService.EditUserByUser(userId, userDto, cancellationToken);
            return result;
        }

        [HttpPost("upload-user-excel-file")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadUserExcelFile([FromForm] UploadFileDto uploadFileDto, CancellationToken cancellationToken)
        {
            await _userService.UploadUserExcelFile(uploadFileDto.UserId, uploadFileDto.ExcelFile, cancellationToken);
            return Ok("فایل اکسل با موفقیت بارگذاری شد.");
        }

        [HttpPost("user-upload-user-excel-file")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UploadUserExcelFile([FromForm] UserUploadFileDto uploadFileDto, CancellationToken cancellationToken)
        {
            var userId = int.Parse(User.Identity.GetUserId());
            await _userService.UploadUserExcelFile(userId, uploadFileDto.ExcelFile, cancellationToken);
            return Ok("فایل اکسل با موفقیت بارگذاری شد.");
        }

        [HttpGet("download-user-excel-file")]
        [Authorize(Roles = "Admin")]
        public async Task<string> DownloadUserExcelFile(int userId, CancellationToken cancellationToken)
        {
            var path = await _userService.DownloadUserExcelFile(userId, cancellationToken);
            return path;
        }

        [HttpGet("download-user-excel-file-by-user")]
        [Authorize(Roles = "User")]
        public async Task<string> DownloadExcelFile(CancellationToken cancellationToken)
        {
            var userId = int.Parse(User.Identity.GetUserId());
            var path = await _userService.DownloadUserExcelFile(userId, cancellationToken);
            return path;
        }
    }
}
