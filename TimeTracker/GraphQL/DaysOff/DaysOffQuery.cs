﻿using BusinessLayer;
using DataLayer.Entities;
using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Common.Types;
using TimeTracker.GraphQL.DaysOff.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.DaysOff
{
    public class DaysOffQuery : ObjectGraphType
    {
        public DaysOffQuery(IDaysOffProvider daysOffProvider)
        {
            Field<ListGraphType<DayOffRequestType>>("List")
                .Description("Gets the list of day off requests.")
                .Argument<PagingInputType>("Paging")
                .Argument<SortingInputType>("Sorting")
                .Resolve(context =>
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

                            var approval = new DayOffRequestApprovalResult();
                            approval.Approver = approver;
                            approval.Status = requestApproverIds.Contains(approver.Id)
                                ? requestApprovals.Single(approval => approval.ApproverId == approver.Id).IsApproved ? DayOffApprovalStatus.Approved : DayOffApprovalStatus.Declined
                                : DayOffApprovalStatus.Pending;
                        }

                        request.Approvals = approvalResults;
                    }
                    return requests;
                });
        }
    }
}
