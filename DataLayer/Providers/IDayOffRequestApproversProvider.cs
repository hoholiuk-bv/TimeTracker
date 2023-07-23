using DataLayer.Entities;

namespace DataLayer.Providers
{
    public interface IDayOffRequestApproversProvider
    {
        void Create(Guid userId, Guid approverId);

        List<User> GetApproversByUserId(Guid userId);

        int DeleteApproversByUserId(Guid userId);
    }
}
