using BusinessLayer;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Approvals
{
    public class ApprovalMutation : ObjectGraphType
    {
        public ApprovalMutation(IDaysOffProvider daysOffProvider) 
        {
            Field<NonNullGraphType<BooleanGraphType>>("ChangeApprovalStatus")
                .Description("Approve or decline a day off request.")
                .Argument<IdGraphType>("requestId")
                .Argument<EnumerationGraphType<DayOffApprovalStatus>>("status")
                .Resolve(context =>
                {
                    var requestId = context.GetArgument<Guid>("requestId");
                    var status = context.GetArgument<DayOffApprovalStatus>("status");
                    var approverId = context.RequestServices!.GetRequiredService<UserContext>().User!.Id;
                    daysOffProvider.ChangeApprovalStatus(requestId, approverId, status);

                    return true;
                });
        }
    }
}
