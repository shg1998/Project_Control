using Microsoft.AspNetCore.Http;
using Services.Dtos.User;
using Services.WebFramework.Pagination;

namespace Services.Services.User
{
    public interface IUserService
    {
        Task<LoginResponseDto> Login(LoginDto loginDto, CancellationToken cancellationToken);
        Task CreateUser(CreateUserDto userDto, CancellationToken cancellationToken);
        Task DeleteUser(int userId, CancellationToken cancellationToken);
        Task<PagedQueryable<UserDisplayDto>> GetAllUsers(string? queries, CancellationToken cancellationToken);
        Task RegisterUser(RegisterDto userDto, CancellationToken cancellationToken);
        Task EditUserByAdmin(int userId, UserDto userDto, CancellationToken cancellationToken);
        Task<LoginResponseDto> EditUserByUser(int userId, EditUserDto userDto, CancellationToken cancellationToken);
        Task UploadUserExcelFile(int userId, IFormFile file, CancellationToken cancellationToken);
        Task<string> DownloadUserExcelFile(int userId, CancellationToken cancellationToken);
    }
}
