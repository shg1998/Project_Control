using System.ComponentModel.DataAnnotations;

namespace Services.Dtos.Role
{
    public class RoleDto
    {
        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Description { get; set; }
    }
}
