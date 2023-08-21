using DataLayer.Entities;
using DataLayer.Models;
using static DataLayer.Constants;

namespace DataLayer.Providers;

public interface IDaysOffProvider
{
    void CreateRequest(DayOffRequest dayOffRequest);

    List<DayOffRequest> GetRequests(DayOffRequestFilter filter, Sorting? sorting = null, Paging? paging = null);

    List<DayOffRequest> GetActiveRequests(DayOffRequestFilter filter);

    int GetRequestsCount(DayOffRequestFilter filter);

    List<DayOffRequestApprover> GetApprovers(IEnumerable<Guid> approverIds);

    void CreateApprovals(IEnumerable<Guid> approverIds, Guid requestId);

    void DeleteApprovals(IEnumerable<Guid> approverIds, Guid requestId);

    List<DayOffRequestApproval> GetApprovals(List<Guid> requestIds);

    List<DayOffRequestApproval> GetApprovals(Sorting sorting, Paging paging, Guid approverId);

    int GetApprovalsCount(Guid approverId);

    void ChangeApprovalStatus(Guid requestId, Guid approverId, DayOffApprovalStatus status, string declineReason);

    void DeleteDayOffRequest(Guid requestId);

    DayOffRequest GetRequest(Guid requestId);
}
