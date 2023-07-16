using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.DaysOff;
using TimeTracker.GraphQL.Profile;
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

            Field<ProfileMutation>("Profile")
                .Description("Mutation for profile")
                .AllowAnonymous()
                .Resolve(context => new { });

            Field<DaysOffMutation>("DaysOff")
                .Description("Mutation for days off")
                .Resolve(context => new { });
        }
    }
}
