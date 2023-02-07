using Common.Exceptions;
using Common.Utilities;
using Data.Contracts;
using Entities.User;
using Microsoft.EntityFrameworkCore;
using Common;

namespace Data.Repositories
{
    public class UserRepository : Repository<UserEntity>, IUserRepository, IScopedDependency
    {
        public UserRepository(ApplicationDbContext dbContext)
            : base(dbContext)
        {
        }

        public Task<UserEntity> GetByUserAndPass(string username, string password, CancellationToken cancellationToken)
        {
            var passwordHash = SecurityHelper.GetSha256Hash(password);
            return Table.Where(p => p.UserName == username && p.PasswordHash == passwordHash).SingleOrDefaultAsync(cancellationToken);
        }

        public Task UpdateSecurityStampAsync(UserEntity user, CancellationToken cancellationToken)
        {
            //user.SecurityStamp = Guid.NewGuid();
            return UpdateAsync(user, cancellationToken);
        }

        //public override void Update(User entity, bool saveNow = true)
        //{
        //    entity.SecurityStamp = Guid.NewGuid();
        //    base.Update(entity, saveNow);
        //}

        public Task UpdateLastLoginDateAsync(UserEntity user, CancellationToken cancellationToken)
        {
            user.LastLoginDate = DateTimeOffset.Now;
            return UpdateAsync(user, cancellationToken);
        }

        public async Task AddAsync(UserEntity user, string password, CancellationToken cancellationToken)
        {
            var exists = await TableNoTracking.AnyAsync(p => p.UserName == user.UserName, cancellationToken: cancellationToken);
            if (exists)
                throw new BadRequestException("نام کاربری تکراری است");

            var passwordHash = SecurityHelper.GetSha256Hash(password);
            user.PasswordHash = passwordHash;
            await base.AddAsync(user, cancellationToken);
        }
    }
}
