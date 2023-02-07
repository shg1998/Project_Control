using Entities.User;
using Services.Dtos.General;
using System.ComponentModel.DataAnnotations;

namespace Services.Dtos.User
{
    public class CreateUserDto : BaseDtoComplexKey<CreateUserDto, UserEntity>
    {
        [Required]
        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(500)]
        public string Password { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }

        public bool IsActive { get; set; }
    }
}
