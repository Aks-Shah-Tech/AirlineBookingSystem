using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AilrineWebAPI.Models;
using Microsoft.Extensions.Logging;
using AilrineWebAPI.Repository.RegisterUsersRepository;
using System.Collections;

namespace AilrineWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterUsersController : ControllerBase
    {
        private readonly AirlineSystemDbContext _context;
        private readonly ILogger<RegisterUsersController> _logger;
        private readonly IRegisterUsersRepository _registerUsersRepository;

        public RegisterUsersController(AirlineSystemDbContext context, ILogger<RegisterUsersController> logger,
            IRegisterUsersRepository registerUsersRepository)
        {
            _context = context;
            _logger = logger;
            _registerUsersRepository = registerUsersRepository;
        }

        // GET: api/RegisterUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisterUser>>> Getusers()
        {
            return await _registerUsersRepository.Getusers();
        }

        // GET: api/RegisterUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisterUser>> GetRegisterUser(int id)
        {
            try
            {
                return await _registerUsersRepository.GetRegisterUser(id);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return NotFound();
            }
        }

        // Authenticating user by their email and password
        // GET: api/RegisterUsers/alan@gmail.com/alan1
        [HttpGet("{email}/{password}")]
        public async Task<ActionResult<RegisterUser>> GetRegisterUserByPwd(string email, string password)
        {
            Hashtable err = new Hashtable();
            try
            {
                var authUser = await _registerUsersRepository.GetRegisterUserByPwd(email, password);
                if (authUser != null)
                {
                    return Ok(authUser);
                }
                else
                {
                    err.Add("Status", "Error");

                    err.Add("Message", "Invalid Credentials");

                    return Ok(err);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        // PUT: api/RegisterUsers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegisterUser(int id, RegisterUser registerUser)
        {
            if (id != registerUser.UserId)
            {
                return BadRequest();
            }

            _context.Entry(registerUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisterUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            _logger.LogInformation("User updated successfully.");
            return NoContent();
        }

        // POST: api/RegisterUsers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RegisterUser>> PostRegisterUser(RegisterUser registerUser)
        {
            await _registerUsersRepository.PostRegisterUser(registerUser);
            return CreatedAtAction("GetRegisterUser", new { id = registerUser.UserId }, registerUser);
        }

        // DELETE: api/RegisterUsers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RegisterUser>> DeleteRegisterUser(int id)
        {
            try
            {
                return await _registerUsersRepository.DeleteRegisterUser(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return NotFound();
            }
        }

        private bool RegisterUserExists(int id)
        {
            return _registerUsersRepository.RegisterUserExists(id);
        }
    }
}
