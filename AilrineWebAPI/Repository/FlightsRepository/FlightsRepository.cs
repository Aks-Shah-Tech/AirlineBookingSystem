using AilrineWebAPI.Controllers;
using AilrineWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AilrineWebAPI.Repository.FlightsRepository
{
    public class FlightsRepository : IFlightsRepository
    {
        private readonly AirlineSystemDbContext _context;
        private readonly ILogger<FlightsRepository> _logger;

        public FlightsRepository(AirlineSystemDbContext context, ILogger<FlightsRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<ActionResult<IEnumerable<Flight>>> Getflights()
        {
            _logger.LogInformation("Getting all the flights successfully.");
            return await _context.flights.ToListAsync();
        }

        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            var flight = await _context.flights.FindAsync(id);
            if (flight == null)
            {
                throw new NullReferenceException("Sorry, no flight found with this id " + id);
            }
            else
            {
                return flight;
            }
        }

        public async Task<ActionResult<Flight>> PostFlight(Flight flight)
        {
            _context.flights.Add(flight);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Flight created successfully.");

            return flight;
        }

        public async Task<ActionResult<Flight>> DeleteFlight(int id)
        {
            var flight = await _context.flights.FindAsync(id);
            if (flight == null)
            {
                throw new NullReferenceException("Sorry, no flight found with this id " + id);
            }
            else
            {
                _context.flights.Remove(flight);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Flight deleted successfully.");

                return flight;
            }
        }

        public bool FlightExists(int id)
        {
            return _context.flights.Any(e => e.FlightId == id);
        }
    }
}
