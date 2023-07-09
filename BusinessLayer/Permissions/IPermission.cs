using DataLayer.Entities;

namespace BusinessLayer.Permissions
{
    public interface IPermission
    {
        PermissionType Type { get; }

        bool IsGranted(User? user);
    }
}
