using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class UserProvider : Provider, IUserProvider
    {
        public UserProvider(IConfiguration configuration) : base(configuration) { }

        public IEnumerable<User> GetAllUsers(UserFilter? filter, Sorting? sort, Paging? pagination)
        {
            var usersData = Query<UserData>(Queries.Users.GetAll(filter, sort, pagination), filter);
            return usersData.Select(data => new User(data));
        }

        public int GetTotalUsersCount(UserFilter? filter)
            => Query<int>(Queries.Users.GetTotalUsersCount(filter), filter).First();

        public bool CheckIfAnyExists()
            => Query<User>(Queries.Users.CheckIfExists).Any();

        public int Create(User user)
            => Execute(Queries.Users.Create, user.ToData());

        public User? Update(User user)
        {
            var userData = Query<UserData>(Queries.Users.Update, user.ToData()).FirstOrDefault();
            return userData == null ? null : new User(userData);
        }

        public User? GetByEmail(string email)
        {
            var userData = Query<UserData>(Queries.Users.GetByEmail, new { Email = email }).FirstOrDefault();
            return userData == null ? null : new User(userData);
        }

        public User? GetById(string id)
        {
            var userData = Query<UserData>(Queries.Users.GetById, new { Id = id }).FirstOrDefault();
            return userData == null ? null : new User(userData);
        }
    }
}
