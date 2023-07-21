using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class UserProvider : Provider, IUserProvider
    {
        public UserProvider(IConfiguration configuration) : base(configuration) { }

        public IEnumerable<User> GetAllUsers(FilterModel? filter, Sorting? sort, Paging? pagination)
            => Query<User>(Queries.Users.GetAll(filter, sort, pagination), filter);

        public int GetTotalUsersCount(FilterModel? filter) 
            => Query<int>(Queries.Users.GetTotalUsersCount(filter), filter).First();

        public bool CheckIfAnyExists()
            => Query<User>(Queries.Users.CheckIfExists).Any();

        public int Save(User user)
            => Execute(Queries.Users.Save, user);

        public User? GetByEmail(string email)
            => Query<User>(Queries.Users.GetByEmail, new { Email = email }).FirstOrDefault();

        public User? GetById(string id)
            => Query<User>(Queries.Users.GetById, new { Id = id }).FirstOrDefault();
        
    }
}
