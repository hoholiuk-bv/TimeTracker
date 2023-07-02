using DataLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class UserProvider : Provider, IUserProvider
    {
        public UserProvider(IConfiguration configuration) : base(configuration) { }

        public IEnumerable<User> GetAllUsers()
        {
            string query = Queries.GetAllQuery;
            return Query<User>(query);
        }

        public int GetTotalUsersCount()
        {
            string query = Queries.GetTotalUsersCountQuery;
            return Query<int>(query).First();
        }
    }
}
