namespace Services.Dtos.User
{
    public class LoginResponseDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string UserRoleName { get; set; }
        public string Token { get; set; }
    }
}
