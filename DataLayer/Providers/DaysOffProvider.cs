using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.Extensions.Configuration;
using static DataLayer.Constants;
using static DataLayer.Providers.Queries;

namespace DataLayer.Providers;

public class DaysOffProvider : Provider, IDaysOffProvider
{
    public DaysOffProvider(IConfiguration configuration) : base(configuration) { }

    public void CreateRequest(DayOffRequest dayOffRequest)
        => Execute(DaysOff.Create, dayOffRequest);

    public List<DayOffRequestApproval> GetApprovals(List<Guid> requestIds)
        => Query<DayOffRequestApproval>(DaysOff.GetApprovalResults, new { RequestIds = requestIds });

    public List<DayOffRequestApprover> GetApprovers(Guid userId)
        => Query<DayOffRequestApprover>(DaysOff.GetApprovers, new { UserId = userId });

    public List<DayOffRequest> GetRequests(DayOffRequestFilter filter, Sorting sorting, Paging paging)
        => Query<DayOffRequest>(DaysOff.GetRequests(filter, sorting, paging));

    public int GetRequestsCount(DayOffRequestFilter filter)
        => Query<int>(DaysOff.GetRequestsCount(filter)).First();

    public List<DayOffRequestApproval> GetApprovals(Sorting sorting, Paging paging, Guid approverId)
        => Query<DayOffRequestApproval>(DaysOff.GetApprovals(sorting, paging), new { ApproverId = approverId });

    public void ChangeApprovalStatus(Guid requestId, Guid approverId, DayOffApprovalStatus status, string declineReason)
        => Execute(DaysOff.ChangeApprovalStatus, new { requestId, approverId, status, declineReason });

    public void CreateApprovals(IEnumerable<Guid> approverIds, Guid requestId)
        => Execute(DaysOff.CreateApprovals(approverIds, requestId));

    public void CreateApproverForUser(Guid userId, Guid approverId)
        => Execute(DayOffRequestApprovers.Create, new { UserId = userId, ApproverId = approverId });

    public void DeleteApproversForUser(Guid userId)
        => Execute(DayOffRequestApprovers.DeleteApproversByUserId, new { UserId = userId });
}
