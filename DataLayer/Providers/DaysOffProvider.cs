using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class DaysOffProvider : Provider, IDaysOffProvider
    {
        public DaysOffProvider(IConfiguration configuration) : base(configuration) { }

        public void CreateRequest(DayOffRequest dayOffRequest)
            => Execute(Queries.DaysOff.Create, dayOffRequest);

        public List<DayOffRequestApproval> GetApprovals(List<Guid> requestIds)
            => Query<DayOffRequestApproval>(Queries.DaysOff.GetApprovals, new { RequestIds = requestIds });

        public List<DayOffRequestApprover> GetApprovers(Guid userId)
            => Query<DayOffRequestApprover>(Queries.DaysOff.GetApprovers, new { UserId = userId });

        public List<DayOffRequest> GetRequests(Sorting sorting, Paging paging)
            => Query<DayOffRequest>(Queries.DaysOff.GetRequests(sorting, paging));
    }
}
