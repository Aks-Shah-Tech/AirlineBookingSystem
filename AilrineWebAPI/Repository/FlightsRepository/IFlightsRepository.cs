using AilrineWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AilrineWebAPI.Repository.FlightsRepository
{
    public interface IFlightsRepository
    {
        Task<ActionResult<IEnumerable<Flight>>> Getflights();
        Task<ActionResult<Flight>> GetFlight(int id);
        Task<ActionResult<Flight>> PostFlight(Flight flight);
        Task<ActionResult<Flight>> DeleteFlight(int id);
        bool FlightExists(int id);
    }
}
