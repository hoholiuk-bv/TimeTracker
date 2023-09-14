using GraphQL.Types;

namespace TimeTracker.GraphQL.Profile.Types;

public class CreatePasswordInputType : InputObjectGraphType<CreatePasswordInput>
{
    public CreatePasswordInputType()
    {
        Name = "CreatePasswordInput";
        Field<NonNullGraphType<StringGraphType>>("Password");
        Field<NonNullGraphType<StringGraphType>>("ConfirmPassword");
        Field<NonNullGraphType<StringGraphType>>("Token");
    }
}

public class CreatePasswordInput
{
    public string Password { get; set; }

    public string ConfirmPassword { get; set; }

    public string Token { get; set; }
}
