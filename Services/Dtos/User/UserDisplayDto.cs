using Entities.User;
using Services.Dtos.General;

namespace Services.Dtos.User
{
    public class UserDisplayDto : BaseDtoComplexKey<UserDisplayDto, UserEntity>
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public DateTimeOffset? LastLoginDate { get; set; }
        public string Email { get; set; }
    }
}
