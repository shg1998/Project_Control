using Entities.User;

namespace Data.Contracts
{
    public interface IUserRepository : IRepository<UserEntity>
    {
        Task AddAsync(UserEntity user, string password, CancellationToken cancellationToken);
        Task<UserEntity> GetByUserAndPass(string username, string password, CancellationToken cancellationToken);
        Task UpdateLastLoginDateAsync(UserEntity user, CancellationToken cancellationToken);
        Task UpdateSecurityStampAsync(UserEntity user, CancellationToken cancellationToken);
    }
}
