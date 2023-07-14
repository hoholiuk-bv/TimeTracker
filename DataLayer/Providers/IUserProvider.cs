using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        void Save(User user);

        bool CheckIfAnyExists();

        User? GetByEmail(string email);

        IEnumerable<User> GetAllUsers(FilterModel filter, SortModel sort, PaginationModel pagination);

        User? GetById(string id);

        int GetTotalUsersCount(FilterModel filter);
    }
}
