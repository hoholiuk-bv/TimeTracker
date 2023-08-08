using static DataLayer.Constants;

namespace DataLayer.Models
{
    public class UserFilter
    {
        public string SearchText { get; set; }

        public DateTime? StartEmploymentDate { get; set; }

        public DateTime? EndEmploymentDate { get; set; }

        public IEnumerable<EmploymentType> EmploymentTypes { get; set; }

        public bool ShowOnlyActiveUsers { get; set; }

        public UserFilter(string searchText = "", DateTime? startEmploymentDate = null, DateTime? endEmploymentDate = null, IEnumerable<EmploymentType>? employmentTypes = null, bool showOnlyActiveUsers = true) 
        {
            SearchText = searchText;
            StartEmploymentDate = startEmploymentDate;
            EndEmploymentDate = endEmploymentDate;
            EmploymentTypes = employmentTypes ?? new List<EmploymentType>();
            ShowOnlyActiveUsers = showOnlyActiveUsers;
        }
    }
}
