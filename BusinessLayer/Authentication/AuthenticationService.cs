using DataLayer.Entities;
using System.Security.Cryptography;
using System.Text;

namespace BusinessLayer.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtTokenService tokenService;

        public AuthenticationService(IJwtTokenService tokenService)
        {
            this.tokenService = tokenService;
        }

        public bool Authenticate(User user, string password, out string? token)
        {
            var hash = GenerateHash(password, user.Salt);
            var authenticated = user.Password == hash;
            token = null;

            if (authenticated)
                token = tokenService.GetToken(user.Id.ToString());

            return authenticated;
        }

        public string GenerateHash(string password, string salt)
        {
            var md5 = MD5.Create();
            var md5data = md5.ComputeHash(Encoding.ASCII.GetBytes(password + salt));

            return Convert.ToBase64String(md5data);
        }

        public string GenerateSalt()
        {
            var bytes = RandomNumberGenerator.GetBytes(24);
            return Convert.ToBase64String(bytes);
        }
    }
}
