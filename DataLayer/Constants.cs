namespace DataLayer
{
    public static class Constants
    {
        public enum EmploymentType : byte
        {
            FullTime = 0,
            PartTime = 1,
        }

        public enum DayOffReason
        {
            Vacation,
            SickLeave,
            DayOff
        }

        public enum SortingType
        {
            Ascending,
            Descending
        }

        public static readonly Dictionary<EmploymentType, string> EmploymentTypeMappings = new Dictionary<EmploymentType, string>
        {
            { EmploymentType.FullTime, "full-time" },
            { EmploymentType.PartTime, "part-time" },
        };
    }
}
