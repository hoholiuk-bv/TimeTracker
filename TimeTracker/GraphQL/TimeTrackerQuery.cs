using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Profile;
using TimeTracker.GraphQL.Users;
using TimeTracker.GraphQL.Worktime;

namespace TimeTracker.GraphQL
{
    public class TimeTrackerQuery : ObjectGraphType
    {
        public TimeTrackerQuery()
        {
            Field<UsersQuery>("Users")
                .Description("Queries for users")
                .Authorize()
                .Resolve(context => new { });

            Field<ProfileQuery>("Profile")
                .Description("Queries for profile")
                .Resolve(context => new { });
            
            Field<WorktimeQuery>("Worktime")
                .Description("Queries for worktime")
                .Resolve(context => new { });
        }
    }
}
