using Entities.Role;
using Entities.User;
using Microsoft.AspNetCore.Identity;

namespace Data
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultRolesAsync(RoleManager<RoleEntity> roleManager)
        {
            var defaultRoles = new List<RoleEntity>
            {
                new ()
                {
                    Name = "Admin",
                    Description = "Full Access"
                },
                new ()
                {
                    Name = "User",
                    Description = "Normal Access"
                }
            };
            foreach (var role in defaultRoles)
            {
                var roleExist = await roleManager.RoleExistsAsync(role.Name);
                if (!roleExist)
                {
                    //create the roles and seed them to the database
                    await roleManager.CreateAsync(new RoleEntity
                    {
                        Name = role.Name,
                        Description = role.Description
                    });
                }
            }
        }

        //AQAAAAEAACcQAAAAECO6Iu7R1fqtshraElq+n8emjSAXqcdlsiLPjIla/p8j1L5yi+wxtD+h/3umRZHwvQ==
        public static async Task SeedDefaultUserAsync(UserManager<UserEntity> userManager)
        {
            var defaultUser = new UserEntity { UserName = "admin", Email = "admin@gmail.com", FullName = "admin", IsActive = true };
            if (userManager.Users.All(u => u.Id != 1))
            {
                var adminUser = await userManager.CreateAsync(defaultUser, "Saadat@123456789");
                if (adminUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(defaultUser, "Admin");
                }
            }
        }
    }
}