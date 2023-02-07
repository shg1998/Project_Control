using Entities.Common;
using Microsoft.AspNetCore.Identity;

namespace Entities.Role
{
    public class RoleEntity : IdentityRole<int>, IEntity
    {
        public string Description { get; set; }
    }
}
