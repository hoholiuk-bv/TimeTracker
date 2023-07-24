namespace BusinessLayer.Permissions
{
    public class PermissionSet
    {
        public IEnumerable<IPermission> Permissions { get; init; }

        public PermissionSet()
        {
            Permissions = new IPermission[]
            {
                new ManageUsersPermission(),
                new ConfigureCalendarPermission(),
                new UseManualTimeRegistrationPermission()
            };
        }
    }

    public enum PermissionType
    {
        ManageUsers,
        ConfigureCalendar,
        UseManualTimeRegistration
    }
}
