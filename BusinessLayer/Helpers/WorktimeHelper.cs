using DataLayer.Entities;
using static DataLayer.Constants;

namespace BusinessLayer.Helpers
{
    public static class WorktimeHelper
    {
        public static decimal GetPlannedWorktime(int year, int month, List<CalendarRule>? calendarRules, decimal userWorkingHoursCount, int userWorkingDaysCount)
        {
            int daysCountInMonth = DateTime.DaysInMonth(year, month);

            List<DateTime> dateList = Enumerable.Range(1, daysCountInMonth).Select(day => new DateTime(year, month, day)).ToList();

            decimal plannedWorktime = userWorkingHoursCount * userWorkingDaysCount;

            foreach (var date in dateList)
            {
                var ruleForCurrentDay = calendarRules.FirstOrDefault(calendarRule => CalendarHelper.CheckIfDateMatchesRule(date, calendarRule));

                if (ruleForCurrentDay != null && ruleForCurrentDay.Type == CalendarRuleSetupType.ShortDay)
                {
                    if (ruleForCurrentDay.ShortDayDuration < userWorkingHoursCount)
                    {
                        decimal? difference = userWorkingHoursCount - ruleForCurrentDay.ShortDayDuration;

                        if (difference.HasValue)
                        {
                            plannedWorktime -= difference.Value;
                        }
                    }
                }
            }

            return plannedWorktime;
        }
    }
}
