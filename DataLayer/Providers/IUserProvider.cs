using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        void Save(User user);

        bool CheckIfAnyExists();

        User? GetByEmail(string email);

        IEnumerable<User> GetAllUsers(FilterModel filter, Sorting sort, Paging pagination);

        User? GetById(string id);

        int GetTotalUsersCount(FilterModel filter);
    }
}
