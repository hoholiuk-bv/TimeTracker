using DataLayer.Entities;
using Google.Apis.Auth;

namespace BusinessLayer.Authentication
{
    public interface IAuthenticationService
    {
        string GenerateHash(string password, string salt);

        bool Authenticate(User user, string password, out string? token);

        string GenerateSalt();

        Task<string> AuthenticateGoogle(string googleToken);

        Task<GoogleJsonWebSignature.Payload>? VerifyGoogleTokenId(string token);
    }
}
