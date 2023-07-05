using DataLayer;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Profile.Types;

public class CreateUserInputType : InputObjectGraphType<CreateUserInput>
{
    public CreateUserInputType()
    {
        Name = "CreateUserInput";
        Field<NonNullGraphType<StringGraphType>>("Name");
        Field<NonNullGraphType<StringGraphType>>("Surname");
        Field<NonNullGraphType<StringGraphType>>("Email");
        Field<NonNullGraphType<StringGraphType>>("Password");
        Field<BooleanGraphType>("IsAdmin");
        Field<NonNullGraphType<StringGraphType>>("EmploymentType");
    }
}

    public class CreateUserInput
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        
        public bool IsAdmin { get; set; }
        
        
       public Constants.EmploymentType EmploymentType { get; set; }
    }
    
