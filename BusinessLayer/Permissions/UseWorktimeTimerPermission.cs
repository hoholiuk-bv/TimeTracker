using DataLayer;
using DataLayer.Entities;

namespace BusinessLayer.Permissions;

public class UseWorktimeTimerPermission : IPermission
{
    public PermissionType Type => PermissionType.UseWorktimeTimer;

    public bool IsGranted(User? user)
    {
        return user?.EmploymentType == Constants.EmploymentType.PartTime;
    }
}