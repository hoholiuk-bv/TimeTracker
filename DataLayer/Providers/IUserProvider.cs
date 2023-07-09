using DataLayer.Entities;

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        void Save(User user);

        bool CheckIfAnyExists();

        User? GetByEmail(string email);

        User? GetById(string id);

        IEnumerable<User> GetAllUsers();

        int GetTotalUsersCount();
    }
}
