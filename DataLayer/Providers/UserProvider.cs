using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class UserProvider : Provider, IUserProvider
    {
        public UserProvider(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
