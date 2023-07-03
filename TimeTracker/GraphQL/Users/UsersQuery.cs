using GraphQL.Types;

namespace TimeTracker.GraphQL.Users
{
    public class UsersQuery : ObjectGraphType
    {
        public UsersQuery() 
        {
            Field<StringGraphType>("Test")
                .Description("Test query")
                .Resolve(context => "Hello world!");
        }
    }
}
