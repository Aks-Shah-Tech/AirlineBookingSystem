using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AilrineWebAPI.Models
{
    public class RegisterUser
    {
        [Key]
        public int UserId { get; set; }
        [Required(ErrorMessage = "UserName is required")]
        [MinLength(4)]
        [MaxLength(20)]
        public string Username { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [MinLength(10)]
        [MaxLength(50)]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }
        [Required(ErrorMessage = "Age is required")]
        [Range(10, 70)]
        public int Age { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [MinLength(5)]
        [MaxLength(20)]
        public string Password { get; set; }
        [Required(ErrorMessage = "Confirm Password is required")]
        [MinLength(5)]
        [MaxLength(20)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
        [Required]
        public string UserType { get; set; }
        public ICollection<Booking> Bookings { get; set; }
    }
}
