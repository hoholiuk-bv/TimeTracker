using GraphQL.Types;

namespace TimeTracker.GraphQL.Profile.Types
{
    public class AuthenticationResultType : ObjectGraphType<AuthenticationResult>
    {
        public AuthenticationResultType()
        {
            Name = "AuthenticationResult";

            Field<NonNullGraphType<StringGraphType>>("Name");
            Field<NonNullGraphType<StringGraphType>>("Surname");
            Field<NonNullGraphType<StringGraphType>>("Token");
        }
    }

    public class AuthenticationResult
    {
        public string Name { get; set; } = null!;

        public string Surname { get; set; } = null!;

        public string Token { get; set; } = null!;
    }
}
