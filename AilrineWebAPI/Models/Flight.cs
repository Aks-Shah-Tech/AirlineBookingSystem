using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AilrineWebAPI.Models
{
    public class Flight
    {
        [Key]
        public int FlightId { get; set; }
        [Required(ErrorMessage = "Flight name is required")]
        [MinLength(5)]
        [MaxLength(20)]
        public string FlightName { get; set; }
        [Required(ErrorMessage = "Source is required")]
        [MinLength(5)]
        [MaxLength(30)]
        public string Source { get; set;}
        [Required(ErrorMessage = "Destination is required")]
        [MinLength(5)]
        [MaxLength(30)]
        public string Destination { get; set;}
        [Required(ErrorMessage = "Departure date is required")]
        public DateTime Departuredate { get; set; }
        [Required(ErrorMessage = "Charges are required")]
        public int Charges { get; set; }
        public ICollection<Booking> Bookings { get; set; }
    }
}
