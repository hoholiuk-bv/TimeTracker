using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        int Create(User user);
        
        bool CheckIfAnyExists();

        User? GetByEmail(string email);

        IEnumerable<User> GetAllUsers(UserFilter? filter, Sorting? sorting, Paging? pagination);

        User? GetById(string id);

        User? Update(User user);

        int GetTotalUsersCount(UserFilter? filter);

        int GetDaysOffCount(Guid userId);

        void UpdateDaysOffCount(Guid userId, int daysOffCount);

        List<Guid> GetAllFullTimerIds();
    }
}
