using Microsoft.AspNetCore.Mvc;
using Smart_Calendar.Application.Dtos;
using Smart_Calendar.Application.Repositories;
using Smart_Calendar.Application.Services;
using Smart_Calendar.Domain.Entities;
using System.Threading.Tasks;
using System.Linq;

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
        public async Task<IActionResult> Login(LoginDto credential)
        {
            var result = await _IdentityService.LoginAsync(credential);
            if (result.Code == System.Net.HttpStatusCode.Unauthorized)
                return Unauthorized();

            return Ok(new { jwtToken = result.Token, result.RoleId, result.AccountId });
            
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterDto regsiterDto)
        {
            var email = regsiterDto.Email;
            var accounts = await _accountRepo.GetAllAsync();
            var res = accounts.FirstOrDefault(a => a.Email == regsiterDto.Email);
            if(res == null){
                await _IdentityService.CreateAccountAsync(regsiterDto);
                return Ok(await _accountRepo.GetAllAsync());
            }
            else
            {
                return Unauthorized();
            }
            
            //return NotFound();

           
            //return Ok(new { jwtToken = result.Token });
           
        }
    }
}