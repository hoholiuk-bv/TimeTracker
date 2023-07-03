using GraphQL.Types;

namespace TimeTracker.GraphQL.Profile.Types
{
    public class FirstUserRegisterInputType : InputObjectGraphType<FirstUserRegisterInput>
    {
        public FirstUserRegisterInputType()
        {
            Name = "FirstUserRegisterInput";
            Field<NonNullGraphType<StringGraphType>>("Name");
            Field<NonNullGraphType<StringGraphType>>("Surname");
            Field<NonNullGraphType<StringGraphType>>("Email");
            Field<NonNullGraphType<StringGraphType>>("Password");
        }
    }

    public class FirstUserRegisterInput
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
