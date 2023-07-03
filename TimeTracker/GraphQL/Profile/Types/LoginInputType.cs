using GraphQL.Types;

namespace TimeTracker.GraphQL.Profile.Types
{
    public class LoginInputType : InputObjectGraphType<LoginInput>
    {
        public LoginInputType()
        {
            Name = "LoginInput";
            Field<NonNullGraphType<StringGraphType>>("Email");
            Field<NonNullGraphType<StringGraphType>>("Password");
        }
    }

    public class LoginInput 
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }

}
