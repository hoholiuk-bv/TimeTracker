using DataLayer.Entities;

namespace BusinessLayer.Permissions
{
    public class ManageUsersPermission : IPermission
    {
        public PermissionType Type => PermissionType.ManageUsers;

        public bool IsGranted(User? user)
        {
            return user?.IsAdmin ?? false;
        }
    }
}
