using Entities.User;

namespace Services.Services.Auth;

public interface IJwtService
{
    Task<string> GenerateAsync(UserEntity user);
}
