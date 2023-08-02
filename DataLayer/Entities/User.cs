using static DataLayer.Constants;

namespace DataLayer.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string Surname { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Salt { get; set; } = null!;

        public bool IsAdmin { get; set; }

        public bool IsActive { get; set; }

        public DateTime EmploymentDate { get; set; }

        public EmploymentType EmploymentType { get; set; }

        public decimal WorkingHoursCount { get; set; }

        public List<Guid> ApproverIds { get; set; } = new List<Guid>();

        public User() { }

        public User(UserData userData)
        {
            this.Id = userData.Id;
            this.Name = userData.Name;
            this.Surname = userData.Surname;
            this.Email = userData.Email;
            this.Password = userData.Password;
            this.Salt = userData.Salt;
            this.IsAdmin = userData.IsAdmin;
            this.IsActive = userData.IsActive;
            this.EmploymentDate = userData.EmploymentDate;
            this.EmploymentType = userData.EmploymentType;
            this.WorkingHoursCount = userData.WorkingHoursCount;
            this.ApproverIds = string.IsNullOrEmpty(userData.ApproverIds) ? new List<Guid>() : userData.ApproverIds.Split(';').Select(id => Guid.Parse(id)).ToList();
        }

        public UserData ToData()
        => new()
        {
            Id = this.Id,
            Name = this.Name,
            Surname = this.Surname,
            Email = this.Email,
            Password = this.Password,
            Salt = this.Salt,
            IsAdmin = this.IsAdmin,
            IsActive = this.IsActive,
            EmploymentDate = this.EmploymentDate,
            EmploymentType = this.EmploymentType,
            WorkingHoursCount = this.WorkingHoursCount,
            ApproverIds = string.Join(';', this.ApproverIds),
        };
    }
}
