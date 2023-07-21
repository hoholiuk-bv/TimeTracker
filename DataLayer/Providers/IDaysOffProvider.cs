using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers;

public interface IDaysOffProvider
{
    void CreateRequest(DayOffRequest dayOffRequest);

    List<DayOffRequest> GetRequests(DayOffRequestFilter filter, Sorting sorting, Paging paging);

    List<DayOffRequestApprover> GetApprovers(Guid userId);

    List<DayOffRequestApproval> GetApprovals(List<Guid> requestIds);
}
