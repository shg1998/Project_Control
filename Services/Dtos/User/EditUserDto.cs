using System.ComponentModel.DataAnnotations;

namespace Services.Dtos.User
{
    public class EditUserDto
    {
        [Required]
        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(500)]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(500)]
        public string NewPassword { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }
    }
}
