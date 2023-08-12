using BusinessLayer;
using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Approvals.Types;
using TimeTracker.GraphQL.Common.Types;

namespace TimeTracker.GraphQL.Approvals
{
    public class ApprovalQuery : ObjectGraphType
    {
        public ApprovalQuery(IDaysOffProvider daysOffProvider) 
        {
            Field<ListGraphType<ApprovalType>>("List")
                .Description("Gets the list of day off approvals.")
                .Argument<PagingInputType>("Paging")
                .Argument<SortingInputType>("Sorting")
                .Resolve(context =>
                {
                    var userContext = context.RequestServices!.GetRequiredService<UserContext>();
                    var sorting = context.GetArgument<Sorting>("sorting");
                    var paging = context.GetArgument<Paging>("paging");
                    var approverId = userContext.User!.Id;
                    var approvals = daysOffProvider.GetApprovals(sorting, paging, approverId);

                    return approvals;
                });

            Field<IntGraphType>("ApprovalsCount")
                .Description("Get approvals count")
                .Resolve(context =>
                {
                    var userContext = context.RequestServices!.GetRequiredService<UserContext>();
                    var approverId = userContext.User!.Id;
                    return daysOffProvider.GetApprovalsCount(approverId);
                });
        }
    }
}
