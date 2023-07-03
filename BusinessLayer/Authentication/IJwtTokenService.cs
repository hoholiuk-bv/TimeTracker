namespace BusinessLayer.Authentication
{
    public interface IJwtTokenService
    {
        string GetToken(string username);
    }
}
