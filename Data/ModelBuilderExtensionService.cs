using Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    internal static class ModelBuilderExtensionService
    {
        internal static void SeedData<T>(this ModelBuilder modelBuilder, params T[] input) where T : class, IEntity => 
            modelBuilder.Entity<T>().HasData(input);
    }
}
