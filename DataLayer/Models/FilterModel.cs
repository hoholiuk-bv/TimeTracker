using static DataLayer.Constants;

namespace DataLayer.Models
{
    public class FilterModel
    {
        public string SearchText { get; set; }

        public DateTime? StartEmploymentDate { get; set; }

        public DateTime? EndEmploymentDate { get; set; }

        public IEnumerable<EmploymentType> EmploymentTypes { get; set; }

        public FilterModel(string searchText = "", DateTime? startEmploymentDate = null, DateTime? endEmploymentDate = null, IEnumerable<EmploymentType>? employmentTypes = null) 
        {
            SearchText = searchText;
            StartEmploymentDate = startEmploymentDate;
            EndEmploymentDate = endEmploymentDate;
            EmploymentTypes = employmentTypes ?? new List<EmploymentType>();
        }
    }
}
