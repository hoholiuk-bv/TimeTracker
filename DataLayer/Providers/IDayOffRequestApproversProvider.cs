namespace DataLayer.Providers
{
    public interface IDayOffRequestApproversProvider
    {
        void Create(Guid userId, Guid approverId);
    }
}
