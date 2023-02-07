using System.ComponentModel.DataAnnotations;

namespace Services.Dtos.User
{
    public class UserDto //: IValidatableObject
    {
        [Required]
        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(500)]
        public string Password { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }

        public string UserRoleName { get; set; }

        public bool IsActive { get; set; }
    }
}
