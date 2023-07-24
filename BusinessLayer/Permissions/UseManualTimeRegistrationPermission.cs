using DataLayer;
using DataLayer.Entities;

namespace BusinessLayer.Permissions;

public class UseManualTimeRegistrationPermission : IPermission
{
    public PermissionType Type => PermissionType.UseManualTimeRegistration;

    public bool IsGranted(User? user)
    {
        return user?.EmploymentType == Constants.EmploymentType.PartTime;
    }
}