using Entities.Common;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Entities.User
{
    public class UserEntity : IdentityUser<int>, IEntity
    {
        public UserEntity() => IsActive = true;

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }
        public bool IsActive { get; set; }
        public DateTimeOffset? LastLoginDate { get; set; }
        public string? ImagePath { get; set; }
        public string? ExcelPath { get; set; }
    }
}
