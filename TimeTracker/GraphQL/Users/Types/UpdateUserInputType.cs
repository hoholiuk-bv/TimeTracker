using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Users.Types
{
    public class UpdateUserInputType : InputObjectGraphType<UpdateUserInput>
    {
        public UpdateUserInputType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.IsAdmin);
            Field(t => t.IsActive);
            Field(t => t.EmploymentDate);
            Field(t => t.EmploymentType);
            Field(t => t.ApproversIdList);
            Field(t => t.WorkingHoursCount);
            Field(t => t.DaysOffCount);
        }
    }

    public class UpdateUserInput
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string Surname { get; set; } = null!;

        public string Email { get; set; } = null!;

        public bool IsAdmin { get; set; }

        public bool IsActive { get; set; }

        public string EmploymentDate { get; set; } = null!;

        public EmploymentType EmploymentType { get; set; }

        public List<Guid> ApproversIdList { get; set; } = null!;

        public decimal WorkingHoursCount { get; set; }

        public int DaysOffCount { get; set; }
    }

}
