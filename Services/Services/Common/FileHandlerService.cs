using Common;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Services.Services.Common
{
    public class FileHandlerService : IFileHandlerService, IScopedDependency
    {

        private readonly IWebHostEnvironment _environment;

        public FileHandlerService(IWebHostEnvironment environment) => this._environment = environment;

        public async Task AddFile(string fileName, IFormFile file, string directoryName, CancellationToken cancellationToken)
        {
            var filePath = Path.Combine(this._environment.WebRootPath, "Files", directoryName, fileName);
            await using var stream = File.Create(filePath);
            await file.CopyToAsync(stream, cancellationToken);
        }

        public void DeleteFile(string fileName, string directoryName)
        {
            var filePath = Path.Combine(_environment.WebRootPath, "Files", directoryName, fileName);
            if (File.Exists(filePath))
                File.Delete(filePath);
        }
    }
}
