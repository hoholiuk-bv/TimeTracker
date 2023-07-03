using DataLayer.Entities;

namespace DataLayer.Providers

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        void Save(User user);

        bool CheckIfAnyExists();

        User? GetByEmail(string email);
    }
}
