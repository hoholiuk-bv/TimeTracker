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
                new UseWorktimeTimerPermission()
            };
        }
    }

    public enum PermissionType
    {
        ManageUsers,
        ConfigureCalendar,
        UseWorktimeTimer,
    }
}
