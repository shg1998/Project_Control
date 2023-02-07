using Microsoft.AspNetCore.Http;

namespace Services.Dtos.User
{
    public class UploadFileDto
    {
        public int UserId { get; set; }
        public IFormFile ExcelFile { get; set; }
    }
}
