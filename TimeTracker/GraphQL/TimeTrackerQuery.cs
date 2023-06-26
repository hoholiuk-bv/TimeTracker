using GraphQL.Types;
using TimeTracker.GraphQL.Users;

namespace TimeTracker.GraphQL
{
    public class TimeTrackerQuery : ObjectGraphType
    {
        public TimeTrackerQuery()
        {
            Field<UsersQuery>("Users")
                .Description("Queries for users")
                .Resolve(context => new { });
        }
    }
}
