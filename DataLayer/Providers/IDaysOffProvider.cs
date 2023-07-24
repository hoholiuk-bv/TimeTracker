using DataLayer.Entities;
using DataLayer.Models;
using static DataLayer.Constants;

namespace DataLayer.Providers;

public interface IDaysOffProvider
{
    void CreateRequest(DayOffRequest dayOffRequest);

    List<DayOffRequest> GetRequests(DayOffRequestFilter filter, Sorting sorting, Paging paging);

    List<DayOffRequestApprover> GetApprovers(Guid userId);

    void CreateApprovals(IEnumerable<Guid> approverIds, Guid requestId);

    List<DayOffRequestApproval> GetApprovals(List<Guid> requestIds);

    List<DayOffRequestApproval> GetApprovals(Sorting sorting, Paging paging, Guid approverId);

    void ChangeApprovalStatus(Guid requestId, Guid approverId, DayOffApprovalStatus status);
}
