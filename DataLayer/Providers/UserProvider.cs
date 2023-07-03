using DataLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class UserProvider : Provider, IUserProvider
    {
        public UserProvider(IConfiguration configuration) : base(configuration) { }

        public IEnumerable<User> GetAllUsers()
        {
            return Query<User>(Queries.Users.GetAll);
        }

        public int GetTotalUsersCount()
        {
            return Query<int>(Queries.Users.GetTotalUsersCount).First();
        }

        public bool CheckIfAnyExists()
            => Query<User>(Queries.CheckIfExists).Any();

        public void Save(User user)
            => Execute(Queries.Save, user);

        public User? GetByEmail(string email)
            => Query<User>(Queries.GetByEmail, new { Email = email }).FirstOrDefault();
    }
}
