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

    public List<DayOffRequestApprover> GetApprovers(IEnumerable<Guid> approverIds)
        => Query<DayOffRequestApprover>(DaysOff.GetApproversByIdList, new { ApproverIds = approverIds });

    public List<DayOffRequest> GetRequests(DayOffRequestFilter filter, Sorting? sorting = null, Paging? paging = null)
        => Query<DayOffRequest>(DaysOff.GetRequests(filter, sorting, paging));

    public List<DayOffRequest> GetActiveRequests(DayOffRequestFilter filter)
        => Query<DayOffRequest>(DaysOff.GetActiveRequests, new { UserId = filter.UserId, StartDate = filter.StartDate });

    public int GetRequestsCount(DayOffRequestFilter filter)
        => Query<int>(DaysOff.GetRequestsCount(filter)).First();

    public List<DayOffRequestApproval> GetApprovals(Sorting sorting, Paging paging, Guid approverId)
        => Query<DayOffRequestApproval>(DaysOff.GetApprovals(sorting, paging), new { ApproverId = approverId });

    public int GetApprovalsCount(Guid approverId)
        => Query<int>(DaysOff.GetApprovalsCount, new { ApproverId = approverId }).First();

    public void ChangeApprovalStatus(Guid requestId, Guid approverId, DayOffApprovalStatus status, string declineReason)
        => Execute(DaysOff.ChangeApprovalStatus, new { requestId, approverId, status, declineReason });

    public void CreateApprovals(IEnumerable<Guid> approverIds, Guid requestId)
        => Execute(DaysOff.CreateApprovals(approverIds, requestId));

    public void DeleteApprovals(IEnumerable<Guid> approverIds, Guid requestId)
        => Execute(DaysOff.DeleteApprovals, new { ApproverIds = approverIds, RequestId = requestId });

    public void DeleteDayOffRequest(Guid requestId)
        => Execute(DaysOff.DeleteDayOffRequest, new { RequestId = requestId });

    public DayOffRequest GetRequest(Guid requestId)
        => Query<DayOffRequest>(DaysOff.GetById, new { Id = requestId }).FirstOrDefault()!;
}
