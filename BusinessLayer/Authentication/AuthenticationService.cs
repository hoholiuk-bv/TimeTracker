using DataLayer.Entities;
using DataLayer.Providers;
using Google.Apis.Auth;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using static DataLayer.Providers.Queries;

namespace BusinessLayer.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtTokenService tokenService;
        private readonly IUserProvider userProvider;

        public AuthenticationService(IJwtTokenService tokenService, IUserProvider userProvider)
        {
            this.tokenService = tokenService;
            this.userProvider = userProvider;
        }

        public bool Authenticate(User user, string password, out string? token)
        {
            var hash = GenerateHash(password, user.Salt);
            var authenticated = user.Password == hash;
            token = null;

            if (authenticated)
                token = tokenService.GenerateToken(new Claim[] { new Claim("id", user.Id.ToString()) }, DateTime.UtcNow.AddMinutes(120));

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

        public async Task<string?> AuthenticateGoogle(string googleToken)
        {
            var payload = await VerifyGoogleTokenId(googleToken);

            if (payload == null)
                return null;

            var user = userProvider.GetByEmail(payload.Email);
            if (user == null)
                return null;

            return tokenService.GenerateToken(new Claim[] { new Claim("id", user.Id.ToString()) }, DateTime.UtcNow.AddMinutes(120));
        }

       public async Task<GoogleJsonWebSignature.Payload>? VerifyGoogleTokenId(string token)
        {
            try
            {
                var validationSettings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new string[] { "883802315963-knqiobamdno06qilt1rrpp3djg9s70c2.apps.googleusercontent.com" }
                };

                GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);

                return payload;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
