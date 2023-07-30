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

        public DaysOffQuery(IDaysOffProvider daysOffProvider)
        {
            this.daysOffProvider = daysOffProvider;

            Field<ListGraphType<DayOffRequestType>>("List")
                .Description("Gets the list of day off requests.")
                .Argument<PagingInputType>("Paging")
                .Argument<SortingInputType>("Sorting")
                .Resolve(context => ResolveList(context));
        }

        private List<DayOffRequest> ResolveList(IResolveFieldContext context)
        {
            var currentUserId = context.RequestServices!.GetRequiredService<UserContext>().User!.Id;
            var sorting = context.GetArgument<Sorting>("sorting");
            var paging = context.GetArgument<Paging>("paging");
            var filter = new DayOffRequestFilter() { UserId = currentUserId };
            var requests = daysOffProvider.GetRequests(filter, sorting, paging);
            if (!requests.Any())
                return requests;

            var approvers = daysOffProvider.GetApprovers(currentUserId);
            var approvals = daysOffProvider.GetApprovals(requests.Select(r => r.Id).ToList());
            foreach (var request in requests)
            {
                var approvalResults = new List<DayOffRequestApprovalResult>();
                var requestApprovals = approvals.Where(approval => approval.RequestId == request.Id);
                var requestApproverIds = requestApprovals.Select(approval => approval.ApproverId);
                foreach (var approver in approvers)
                {
                    var approvalResult = requestApprovals.SingleOrDefault(a => a.ApproverId == approver.Id)?.Status;
                    if (approvalResult == null)
                        continue;

                    var approval = new DayOffRequestApprovalResult()
                    {
                        Approver = approver,
                        Status = requestApprovals.Single(a => a.ApproverId == approver.Id).Status,
                    };
                    approvalResults.Add(approval);
                }

                request.Approvals = approvalResults;
            }
            return requests;
        }
    }
}
