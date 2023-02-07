using System.ComponentModel.DataAnnotations;

namespace Common
{
    public enum ApiResultStatusCode
    {
        [Display(Name = "عملیات با موفقیت انجام شد.")]
        Success = 0,

        [Display(Name = "خطایی در سرور پیش آمده است!")]
        ServerError = 1,

        [Display(Name = "پارامتر های ارسالی نامعتبرند!")]
        BadRequest = 2,

        [Display(Name = "یافت نشد!")]
        NotFound = 3,

        [Display(Name = "لیست خالی است!")]
        ListEmpty = 4,

        [Display(Name = "خطایی در پردازش رخ داد!")]
        LogicError = 5,

        [Display(Name = "خطای احراز هویت و عدم دسترسی")]
        UnAuthorized = 6
    }
}
