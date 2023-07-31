using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Approvals;
using TimeTracker.GraphQL.Calendar;
using TimeTracker.GraphQL.DaysOff;
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

            Field<DaysOffQuery>("DaysOff")
                .Description("Queries for days off")
                .Authorize()
                .Resolve(context => new { });

            Field<ApprovalQuery>("Approvals")
                .Description("Queries for approvals")
                .Resolve(context => new { });

            Field<CalendarQuery>("Calendar")
                .Description("Queries for calendar")
                .Resolve(context => new { });
        }
    }
}
