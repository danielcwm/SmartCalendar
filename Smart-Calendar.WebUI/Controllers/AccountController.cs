using Microsoft.AspNetCore.Mvc;
using Smart_Calendar.Application.Dtos;
using Smart_Calendar.Application.Repositories;
using Smart_Calendar.Application.Services;
using Smart_Calendar.Domain.Entities;
using System.Threading.Tasks;

namespace Smart_Calendar.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IIdentityService _IdentityService;

        public AccountController(IIdentityService IdentityService)
        {
            _IdentityService = IdentityService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto credential)
        {
            var result = await _IdentityService.LoginAsync(credential);
            if (result.Code == System.Net.HttpStatusCode.Unauthorized)
                return Unauthorized();

            //return Ok(new { jwtToken = result.Token });
            return Ok(result);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterDto regsiterDto)
        {
            var result = await _IdentityService.CreateAccountAsync(regsiterDto);
            return Ok(new { jwtToken = result.Token });
        }
    }
}