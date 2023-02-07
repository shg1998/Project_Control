using Microsoft.AspNetCore.Http;

namespace Services.Services.Common
{
    internal interface IFileHandlerService
    {
        Task AddFile(string fileName, IFormFile file , string directoryName, CancellationToken cancellationToken);
        void DeleteFile(string fileName , string directoryName);
    }
}
