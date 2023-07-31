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

            Field<WorktimeMutation>("Worktime")
                .Description("Mutation for worktime")
                .Resolve(context => new { });

            Field<DaysOffMutation>("DaysOff")
                .Description("Mutation for days off")
                .Resolve(context => new { });

            Field<ApprovalMutation>("Approvals")
                .Description("Mutation for approvals")
                .Resolve(context => new { });

            Field<CalendarMutation>("Calendar")
                .Description("Mutation for calendar")
                .Resolve(context => new { });
        }
    }
}
