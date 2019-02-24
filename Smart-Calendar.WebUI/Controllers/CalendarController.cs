using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smart_Calendar.Application.Repositories;
using Smart_Calendar.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Smart_Calendar.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly IBaseRepo<User> _userRepo;

        public CalendarController(IBaseRepo<User> userRepo)
        {

            _userRepo = userRepo;
        }
        // GET api/values
        [HttpGet("User")]
        public async Task<IActionResult> GetUserList()
        {
            var d = await _userRepo.Get(w => w.AccountId != null).Include(v => v.Department).ToListAsync();
            return Ok( d);
        }
        // GET api/values
        [HttpGet("User/{id}")]
        public async Task<IActionResult> GetUserListById(Guid id)
        {
            return Ok( _userRepo.Get(d => d.UserId == new Guid("c45d233c-a3b4-42b1-a91a-0d044a35c0f2")));
        }
    }
}