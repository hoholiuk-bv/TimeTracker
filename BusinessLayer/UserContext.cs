using BusinessLayer.Permissions;
using DataLayer.Entities;

namespace BusinessLayer
{
    public class UserContext
    {
        private readonly IEnumerable<IPermission> permissionSet;

        public UserContext(PermissionSet permissionSet) => this.permissionSet = permissionSet.Permissions;

        public User? User { get; set; }

        public IEnumerable<PermissionType> GetGrantedPermissions()
        {
            var grantedPermissions = new List<PermissionType>();
            foreach (var permission in this.permissionSet)
            {
                if (permission.IsGranted(User))
                    grantedPermissions.Add(permission.Type);
            }

            return grantedPermissions;
        }

        public bool HasPermission(PermissionType permissionType)
        {
            var permission = permissionSet.FirstOrDefault(p => p.Type == permissionType);
            return permission?.IsGranted(User) ?? false;
        }
    }
}
