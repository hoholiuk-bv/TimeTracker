using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BusinessLayer.Authentication
{
    public interface IJwtTokenService
    {
        string GenerateToken(Claim[] claims, DateTime expiration);
        
        bool ValidateToken(string token, out JwtSecurityToken? jwtSecurityToken);
    }
}
