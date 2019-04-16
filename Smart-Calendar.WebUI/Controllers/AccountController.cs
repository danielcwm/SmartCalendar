using Microsoft.AspNetCore.Mvc;
using Smart_Calendar.Application.Dtos;
using Smart_Calendar.Application.Repositories;
using Smart_Calendar.Application.Services;
using Smart_Calendar.Domain.Entities;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Smart_Calendar.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IIdentityService _IdentityService;
        private readonly IBaseRepo<Account> _accountRepo;

        public AccountController(IIdentityService IdentityService, IBaseRepo<Account> accountRepo)
        {
            _IdentityService = IdentityService;
            _accountRepo = accountRepo;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDto credential)
        {
            try
            {
                var result = await _IdentityService.LoginAsync(credential);
                var code = result.Code;
                if (code == System.Net.HttpStatusCode.OK)
                {
                    return Ok(new { jwtToken = result.Token, result.RoleId, result.AccountId });
                }
                else
                {
                    return Unauthorized(new { Message = result.Error });
                }
            }
            catch (System.Exception e)
            {
                return BadRequest(new { e.Message });
            }

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterDto regsiterDto)
        {
            var accounts = await _accountRepo.GetAllAsync();
            var res = accounts.FirstOrDefault(a => a.Email == regsiterDto.Email);
            if (res == null)
            {
                var result = await _IdentityService.CreateAccountAsync(regsiterDto);
                if (result != null)
                {
                    var allAccount = await _accountRepo.GetAllAsync();
                    return Ok(allAccount);
                }
                return BadRequest(new { message = string.Format("Register failed:: {0}", result.Error) });
            }
            else
            {
                return Unauthorized();
            }

        }
    }
}