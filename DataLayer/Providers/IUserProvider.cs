using DataLayer.Entities;
using static DataLayer.Constants;

namespace DataLayer.Providers
{
    public interface IUserProvider
    {
        void Save(User user);

        void SaveWorktime(Worktime worktime);

        IEnumerable<Worktime> GetWorktimeRecords();

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

        User? GetById(string id);

        int GetTotalUsersCount(
            string searchText,
            DateTime? startEmploymentDate,
            DateTime? endEmploymentDate,
            IEnumerable<EmploymentType> employmentTypes);
    }
}
