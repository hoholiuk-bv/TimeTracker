using DataLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class UserProvider : Provider, IUserProvider
    {
        public UserProvider(IConfiguration configuration) : base(configuration) { }

        public IEnumerable<User> GetAllUsers()
            => Query<User>(Queries.Users.GetAll);

        public int GetTotalUsersCount()
            => Query<int>(Queries.Users.GetTotalUsersCount).First();

        public bool CheckIfAnyExists()
            => Query<User>(Queries.Users.CheckIfExists).Any();

        public void Save(User user)
            => Execute(Queries.Users.Save, user);

        public User? GetByEmail(string email)
            => Query<User>(Queries.Users.GetByEmail, new { Email = email }).FirstOrDefault();

        public User? GetById(string id)
            => Query<User>(Queries.Users.GetById, new { Id = id }).FirstOrDefault();
    }
}
