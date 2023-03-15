using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AilrineWebAPI.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        [ForeignKey("Flight")]
        public int FlightId { get; set; }
        public Flight Flight { get; set; }
        [Required(ErrorMessage = "FlightName is required")]
        public string FlightName { get; set; }
        [ForeignKey("RegisterUser")]
        public int UserId { get; set;}
        public RegisterUser RegisterUser { get; set; }
        [Required(ErrorMessage = "UserName is required")]
        [MinLength(4)]
        [MaxLength(20)]
        public string UserName { get; set; }
        [MinLength(10)]
        [MaxLength(10)]
        public string ContactNo { get; set; }
        [Required(ErrorMessage = "Departure date is required")]
        public DateTime DepartureDate { get; set; }

    }
}
