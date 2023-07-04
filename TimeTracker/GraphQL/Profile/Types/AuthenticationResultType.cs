using GraphQL.Types;

namespace TimeTracker.GraphQL.Profile.Types
{
    public class AuthenticationResultType : ObjectGraphType<AuthenticationResult>
    {
        public AuthenticationResultType()
        {
            Name = "AuthenticationResult";

            Field<NonNullGraphType<UserInfoType>>("UserInfo");
            Field<NonNullGraphType<StringGraphType>>("Token");
        }
    }

    public class AuthenticationResult
    {
        public UserInfo? UserInfo { get; set; }

        public string Token { get; set; } = null!;
    }
}
