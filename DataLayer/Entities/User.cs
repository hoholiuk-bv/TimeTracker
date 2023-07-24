using static DataLayer.Constants;

namespace DataLayer.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Salt { get; set; }

        public bool IsAdmin { get; set; }

        public bool IsActive { get; set; }

        public DateTime EmploymentDate { get; set; }

        public EmploymentType EmploymentType { get; set; }

        public decimal WorkingHoursCount { get; set; }
    }
    
   
}
