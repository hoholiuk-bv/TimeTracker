using GraphQL.Types;
using TimeTracker.GraphQL.Users;

namespace TimeTracker.GraphQL
{
    public class TimeTrackerMutation : ObjectGraphType
    {
        public TimeTrackerMutation() 
        {
            Field<UsersMutation>("Users")
                .Description("Mutation for users")
                .Resolve(context => new { });
        }
    }
}
