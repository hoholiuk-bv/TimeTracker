namespace DataLayer
{
    public static class Constants
    {
        public const decimal MaxWorkingHours = 8.0m;
        
        public enum EmploymentType
        {
            FullTime,
            PartTime,
        }

        public enum DayOffReason
        {
            Vacation,
            SickLeave,
            DayOff
        }

        public enum SortingOrder
        {
            Ascending,
            Descending
        }
    }
}
