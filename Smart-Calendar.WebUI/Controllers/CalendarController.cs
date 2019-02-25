using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smart_Calendar.Application.Repositories;
using Smart_Calendar.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Smart_Calendar.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly IBaseRepo<User> _userRepo;
        private readonly IBaseRepo<UserShift> _userShiftRepo;
        private readonly IBaseRepo<Shift> _shiftRepo;
        private readonly IBaseRepo<Account> _accountRepo;

        public CalendarController(IBaseRepo<User> userRepo, IBaseRepo<UserShift> userShiftRepo, IBaseRepo<Shift> shiftRepo, IBaseRepo<Account> accountRepo)
        {
            _userRepo = userRepo;
            _userShiftRepo = userShiftRepo;
            _shiftRepo = shiftRepo;
            _accountRepo = accountRepo;
        }

        [HttpGet("User")]
        public async Task<IActionResult> GetUserList()
        {
            return Ok(await _userRepo.GetAllAsync());
        }
        // GET api/values
        [HttpGet("User/{id}")]
        public async Task<IActionResult> GetUserInfo(Guid id)
        {
            var user = _userRepo.Get(d => d.UserId == id).SingleOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("User")]
        public async Task<IActionResult> AddUserInfo([FromBody]User user)
        {
           
            await _userRepo.CreateAsync(user);
            var usersInDb = await GetUserList(); 
            return Ok(usersInDb);
        }

        [HttpDelete("User/{id}")]
        public async Task<IActionResult> DeleteUserInfo(Guid id)
        {
            return Ok(await _userRepo.DeleteAsync(d => d.UserId == id));
        }

        [HttpGet("Account")]
        public async Task<IActionResult> GetUserAccountList()
        {
            var accounts = await _accountRepo.GetAllAsync();
            return Ok(accounts);
        }
    }

   public class UserVM
    {
        public Guid Id { get; set; }
        public Guid AccountId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public char Gender { get; set; }
        public string Department { get; set; }
        public string Position { get; set; }
        public List<UserShiftVM> UserShifts { get; set; }
    }

    public class UserShiftVM
    {
        public int UserShiftId { get; set; }
        public int ShiftId { get; set; }
        public int Day { get; set; }

        public ShiftVM Shift { get; set; }

    }

    public class ShiftVM
    {
        public int ShiftId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }

}