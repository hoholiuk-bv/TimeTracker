using DataLayer;
using DataLayer.Entities;

namespace BusinessLayer.Permissions;

public class WorktimePermission : IPermission
{
    public PermissionType Type => PermissionType.Worktime;

    public bool IsGranted(User? user)
    {
        if (user != null && user.EmploymentType != null)
        {
            return user.EmploymentType == Constants.EmploymentType.PartTime;
        }
        return false;
    }
}