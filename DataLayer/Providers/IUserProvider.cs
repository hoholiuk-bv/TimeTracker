using DataLayer.Entities;

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        IEnumerable<User> GetAllUsers();
        int GetTotalUsersCount();
    }
}
