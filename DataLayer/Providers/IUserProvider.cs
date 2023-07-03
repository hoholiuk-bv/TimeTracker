using DataLayer.Entities;

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        void Save(User user);

        bool CheckIfAnyExists();

        User? GetByEmail(string email);

        IEnumerable<User> GetAllUsers();

        int GetTotalUsersCount();
    }
}
