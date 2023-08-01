using DataLayer.Entities;
using DataLayer.Models;
using static DataLayer.Constants;

namespace DataLayer.Providers;

public interface IDaysOffProvider
{
    void CreateRequest(DayOffRequest dayOffRequest);

    List<DayOffRequest> GetRequests(DayOffRequestFilter filter, Sorting sorting, Paging paging);

    int GetRequestsCount(DayOffRequestFilter filter);

    List<DayOffRequestApprover> GetApprovers(Guid userId);

    void CreateApprovals(IEnumerable<Guid> approverIds, Guid requestId);

    List<DayOffRequestApproval> GetApprovals(List<Guid> requestIds);

    List<DayOffRequestApproval> GetApprovals(Sorting sorting, Paging paging, Guid approverId);

    void ChangeApprovalStatus(Guid requestId, Guid approverId, DayOffApprovalStatus status, string declineReason);

    void CreateApproverForUser(Guid userId, Guid approverId);

    void DeleteApproversForUser(Guid userId);

    void DeleteDayOffRequest(Guid requestId);
}
