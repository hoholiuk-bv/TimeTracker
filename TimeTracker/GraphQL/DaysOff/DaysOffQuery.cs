using BusinessLayer;
using DataLayer.Entities;
using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Common.Types;
using TimeTracker.GraphQL.DaysOff.Types;

namespace TimeTracker.GraphQL.DaysOff
{
    public class DaysOffQuery : ObjectGraphType
    {
        private readonly IDaysOffProvider daysOffProvider;
        private readonly IUserProvider userProvider;

        public DaysOffQuery(IDaysOffProvider daysOffProvider, IUserProvider userProvider)
        {
            this.daysOffProvider = daysOffProvider;
            this.userProvider = userProvider;

            Field<ListGraphType<DayOffRequestType>>("List")
                .Description("Gets the list of day off requests.")
                .Argument<PagingInputType>("Paging")
                .Argument<SortingInputType>("Sorting")
                .Argument<DayOffRequestFilterInputType>("Filter")
                .Resolve(context => ResolveList(context));

            Field<IntGraphType>("RequestsCount")
                .Description("Gets requests count.")
                .Argument<DayOffRequestFilterInputType>("Filter")
                .Resolve(context => ResolveRequestsCount(context));

            Field<IntGraphType>("DaysOffCount")
                .Description("Gets days off count for certain user.")
                .Argument<IdGraphType>("userId")
                .Resolve(context =>
                {
                    var userId = context.GetArgument<Guid>("userId");
                    return userProvider.GetDaysOffCount(userId);
                });
        }

        private List<DayOffRequest> ResolveList(IResolveFieldContext context)
        {
            var currentUser = context.RequestServices!.GetRequiredService<UserContext>().User!;
            var sorting = context.GetArgument<Sorting>("sorting");
            var paging = context.GetArgument<Paging>("paging");
            var filter = context.GetArgument<DayOffRequestFilter>("filter");
            if (filter?.UserId == null)
                filter.UserId = currentUser.Id;
            var requests = daysOffProvider.GetRequests(filter, sorting, paging);
            
            if (!requests.Any())
                return requests;
            var approvals = daysOffProvider.GetApprovals(requests.Select(r => r.Id).ToList());
            var approvers = daysOffProvider.GetApprovers(approvals.Select(r => r.ApproverId).Distinct().ToList());
           
            foreach (var request in requests)
            {
                var approvalResults = new List<DayOffRequestApprovalResult>();
                var requestApprovals = approvals.Where(approval => approval.RequestId == request.Id);
                var requestApproverIds = requestApprovals.Select(approval => approval.ApproverId);
                foreach (var approver in approvers)
                {
                    var approval = requestApprovals.SingleOrDefault(a => a.ApproverId == approver.Id);
                    if (approval == null)
                        continue;

                    var approvalResult = new DayOffRequestApprovalResult()
                    {
                        Approver = approver,
                        Status = approval.Status,
                        DeclineReason = approval.DeclineReason,
                    };
                    approvalResults.Add(approvalResult);
                }

                request.Approvals = approvalResults;
            }
            return requests;
        }

        private int ResolveRequestsCount(IResolveFieldContext context)
        {
            var filter = context.GetArgument<DayOffRequestFilter>("filter");
            return daysOffProvider.GetRequestsCount(filter);
        }
    }
}
