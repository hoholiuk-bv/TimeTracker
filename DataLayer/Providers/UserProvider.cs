using DataLayer.Entities;
using Microsoft.Extensions.Configuration;
using static DataLayer.Constants;

namespace DataLayer.Providers
{
    public class UserProvider : Provider, IUserProvider
    {
        public UserProvider(IConfiguration configuration) : base(configuration) { }

        public IEnumerable<User> GetAllUsers(
            string searchText, 
            int pageSize, 
            int pageNumber, 
            string fieldName, 
            string sortingOrder,
            DateTime? startEmploymentDate,
            DateTime? endEmploymentDate,
            IEnumerable<EmploymentType> employmentTypes)
            => Query<User>(Queries.Users.GetAll(employmentTypes, pageSize, pageNumber, fieldName, sortingOrder, startEmploymentDate, endEmploymentDate), 
                new { SearchText = searchText, StartEmploymentDate = startEmploymentDate, EndEmploymentDate = endEmploymentDate});

        public int GetTotalUsersCount(
            string searchText, 
            DateTime? startEmploymentDate,
            DateTime? endEmploymentDate,
            IEnumerable<EmploymentType> employmentTypes) 
            => Query<int>(Queries.Users.GetTotalUsersCount(employmentTypes, startEmploymentDate, endEmploymentDate), 
                new {SearchText = searchText, StartEmploymentDate = startEmploymentDate, EndEmploymentDate = endEmploymentDate}).First();

        public bool CheckIfAnyExists()
            => Query<User>(Queries.Users.CheckIfExists).Any();

        public void Save(User user)
            => Execute(Queries.Users.Save, user);

        public User? GetByEmail(string email)
            => Query<User>(Queries.Users.GetByEmail, new { Email = email }).FirstOrDefault();

        public User? GetById(string id)
            => Query<User>(Queries.Users.GetById, new { Id = id }).FirstOrDefault();
        
        public void SaveWorktime(Worktime worktime)
            => Execute(Queries.Users.SaveWorktime, worktime);
    }
}
