using DataLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class DayOffRequestApproversProvider : Provider, IDayOffRequestApproversProvider
    {
        public DayOffRequestApproversProvider(IConfiguration configuration) : base(configuration) { }

        public void Create(Guid userId, Guid approverId)
            => Execute(Queries.DayOffRequestApprovers.Create, new { UserId = userId, ApproverId = approverId });
        
        public List<User> GetApproversByUserId (Guid userId)
            => Query<User>(Queries.DayOffRequestApprovers.GetApproversByUserId, new { UserId = userId });
        
        public int DeleteApproversByUserId(Guid userId)
            => Execute(Queries.DayOffRequestApprovers.DeleteApproversByUserId, new { UserId = userId });
    }
}
