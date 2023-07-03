using DataLayer.Entities;

namespace BusinessLayer.Authentication
{
    public interface IAuthenticationService
    {
        string GenerateHash(string password, string salt);

        bool Authenticate(User user, string password, out string? token);

        string GenerateSalt();
    }
}
