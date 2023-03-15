using AilrineWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AilrineWebAPI.Repository.BookingsRepository
{
    public interface IBookingsRepository
    {
        Task<ActionResult<IEnumerable<Booking>>> Getbookings();
        Task<ActionResult<Booking>> GetBooking(int id);
        Task<ActionResult<Booking>> PostBooking(Booking booking);
        Task<ActionResult<Booking>> DeleteBooking(int id);
        bool BookingExists(int id);
    }
}
