using Smart_Calendar.Application.Dtos;
using Smart_Calendar.Application.Helper.JWT;
using Smart_Calendar.Application.Repositories;
using Smart_Calendar.Domain.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Smart_Calendar.Application.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly IBaseRepo<Account> _accountRepo;
        private readonly IJWTHelper _jwtHelper;

        public IdentityService(IBaseRepo<Account> accountRepo, IJWTHelper jwtHelper)
        {
            _accountRepo = accountRepo;
            _jwtHelper = jwtHelper;
        }
        public async Task<TokenResponseDto> CreateAccountAsync(RegisterDto registerDto)
        {
            PasswordHashing(out byte[] hash, out byte[] salt, registerDto.Password);
            Account account = new Account
            {
                Email = registerDto.Email,
                RoleId = (int)registerDto.RoleId,
                PasswordHash = hash,
                PasswordSalt = salt
            };
            await _accountRepo.CreateAsync(account);
            return new TokenResponseDto
            {
                Token = _jwtHelper.GenerateToken(registerDto.Email),
                Code = System.Net.HttpStatusCode.OK
            };
        }
        public async Task<TokenResponseDto> LoginAsync(LoginDto credential)
        {
            var user = _accountRepo.Get(a => a.Email == credential.Email).SingleOrDefault();
            if (user == null)
            {
                return new TokenResponseDto { Code = System.Net.HttpStatusCode.Unauthorized };
            }

            if (!VerifyPasswordHash(user.PasswordHash, user.PasswordSalt, credential.Password))
            {
                return new TokenResponseDto { Code = System.Net.HttpStatusCode.Unauthorized };
            }

            return new TokenResponseDto
            {
                Token = _jwtHelper.GenerateToken(credential.Email),
                Code = System.Net.HttpStatusCode.OK,
                RoleId = user.RoleId,
                AccountId = user.AccountId
            };
        }
        private bool VerifyPasswordHash(byte[] hash, byte[] salt, string password)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != hash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }
        private void PasswordHashing(out byte[] hash, out byte[] salt, string password)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
