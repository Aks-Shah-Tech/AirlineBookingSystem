using AilrineWebAPI.Controllers;
using AilrineWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AilrineWebAPI.Repository.BookingsRepository
{
    public class BookingsRepository : IBookingsRepository
    {
        private readonly AirlineSystemDbContext _context;
        private readonly ILogger<BookingsRepository> _logger;

        public BookingsRepository(AirlineSystemDbContext context, ILogger<BookingsRepository> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<ActionResult<IEnumerable<Booking>>> Getbookings()
        {
            _logger.LogInformation("Getting all the bookings successfully.");
            return await _context.bookings.ToListAsync();
        }

        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.bookings.FindAsync(id);
            if (booking == null)
            {
                throw new NullReferenceException("Sorry, no booking found with this id " + id);
            }
            else
            {
                return booking;
            }
        }

        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            _context.bookings.Add(booking);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Booking created successfully.");

            return booking;
        }

        public async Task<ActionResult<Booking>> DeleteBooking(int id)
        {
            var booking = await _context.bookings.FindAsync(id);
            if (booking == null)
            {
                throw new NullReferenceException("Sorry, no flight found with this id " + id);
            }
            else
            {
                _context.bookings.Remove(booking);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Booking deleted successfully.");

                return booking;
            }
        }

        public bool BookingExists(int id)
        {
            return _context.bookings.Any(e => e.BookingId == id);
        }
    }
}
