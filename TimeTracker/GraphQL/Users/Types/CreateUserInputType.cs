using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Users.Types;

public class CreateUserInputType : InputObjectGraphType<CreateUserInput>
{

    public CreateUserInputType()
    {
        Name = "CreateUserInput";
        Field(t => t.Name);
        Field(t => t.Surname);
        Field(t => t.Email);
        Field(t => t.Password);
        Field(t => t.EmploymentDate);
        Field(t => t.IsAdmin, nullable: true);
        Field(t => t.EmploymentType);
        Field(t => t.ApproversIdList);
        Field(t => t.WorkingHoursCount);
    }
}

public class CreateUserInput
{
    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string EmploymentDate { get; set; } = null!;

    public bool IsAdmin { get; set; }

    public EmploymentType EmploymentType { get; set; }

    public List<Guid> ApproversIdList { get; set; } = null!;

    public decimal WorkingHoursCount { get; set; }
}
