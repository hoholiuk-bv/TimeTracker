using DataLayer.Entities;
using static DataLayer.Constants;

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        void Save(User user);

        bool CheckIfAnyExists();

        User? GetByEmail(string email);

        IEnumerable<User> GetAllUsers(
            string searchText, 
            int pageSize, 
            int pageNumber,
            string fieldName,
            string sortingOrder, 
            DateTime? startEmploymentDate,
            DateTime? endEmploymentDate,
            IEnumerable<EmploymentType> employmentTypes);

        int GetTotalUsersCount(
            string searchText,
            DateTime? startEmploymentDate,
            DateTime? endEmploymentDate,
            IEnumerable<EmploymentType> employmentTypes);
    }
}
