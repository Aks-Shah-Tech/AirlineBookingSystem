using Microsoft.EntityFrameworkCore;
using AilrineWebAPI.Models;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AilrineWebAPI.Models
{
    public class AirlineSystemDbContext : DbContext
    {
        public AirlineSystemDbContext(DbContextOptions<AirlineSystemDbContext> options)
           : base(options)
        {
        }

        public virtual DbSet<RegisterUser> users { get; set; }
        public virtual DbSet<Flight> flights { get; set; }
        public virtual DbSet<Booking> bookings { get; set; }
    }
}
