using DataLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class UserProvider : Provider, IUserProvider
    {
        public UserProvider(IConfiguration configuration) : base(configuration) { }

        public IEnumerable<User> GetAllUsers()
            => Query<User>(Queries.Users.GetAll);

        public IEnumerable<User> SearchUsers(string searchedString)
            => Query<User>(Queries.Users.GetSearchedUsers, new { SearchedString = searchedString });

        public int GetTotalUsersCount()
            => Query<int>(Queries.Users.GetTotalUsersCount).First();

        public bool CheckIfAnyExists()
            => Query<User>(Queries.Users.CheckIfExists).Any();

        public void Save(User user)
            => Execute(Queries.Users.Save, user);

        public User? GetByEmail(string email)
            => Query<User>(Queries.Users.GetByEmail, new { Email = email }).FirstOrDefault();
    }
}
