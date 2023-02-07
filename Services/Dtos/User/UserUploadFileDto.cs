using Microsoft.AspNetCore.Http;

namespace Services.Dtos.User
{
    public class UserUploadFileDto
    {
        public IFormFile ExcelFile { get; set; }
    }
}
