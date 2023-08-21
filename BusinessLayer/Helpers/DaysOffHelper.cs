using DataLayer.Entities;

namespace BusinessLayer.Helpers
{
    public static class DaysOffHelper
    {
        public static bool CheckIfDateMatchesDayOff(DateTime date, DayOffRequest request)
        {
            if (date >= request.StartDate && date <= request.FinishDate)
                return true;

            return false;
        }
    }
}
