using DataLayer.Models;
using DataLayer.Providers;

namespace BusinessLayer.Helpers
{
    public class WorktimeStatisticsHelper
    {
        private readonly IWorktimeProvider worktimeProvider;
        private readonly IUserProvider userProvider;
        private readonly ICalendarProvider calendarProvider;
        private readonly IDaysOffProvider daysOffProvider;

        public WorktimeStatisticsHelper(IWorktimeProvider worktimeProvider, IUserProvider userProvider, ICalendarProvider calendarProvider, IDaysOffProvider daysOffProvider)
        {
            this.worktimeProvider = worktimeProvider;
            this.userProvider = userProvider;
            this.calendarProvider = calendarProvider;
            this.daysOffProvider = daysOffProvider;
        }

        public WorktimeStats GetWorktimeStats(WorktimeFilter filter)
        {
            var worktimeRecords = worktimeProvider.GetWorktimeRecords(null, filter, null).ToList();
            var user = userProvider.GetById(filter.UserId.ToString());

            TimeSpan totalWorkTime = TimeSpan.Zero;

            foreach (var worktime in worktimeRecords)
            {
                totalWorkTime += (worktime.FinishDate - worktime.StartDate) ?? TimeSpan.Zero;
            }

            var calendarRules = calendarProvider.GetCalendarRules();
            var dayOffFilter = new DayOffRequestFilter { UserId = filter.UserId };
            var userRequests = daysOffProvider.GetRequests(dayOffFilter);
            var approvals = daysOffProvider.GetApprovals(userRequests.Select(r => r.Id).ToList());

            int WorkingDaysCount = DaysOffHelper.GetWorkingDaysCount(filter.Year, filter.Month, calendarRules, userRequests, approvals);
            decimal plannedWorktime = WorktimeHelper.GetPlannedWorktime(filter.Year, filter.Month, calendarRules, user.WorkingHoursCount, WorkingDaysCount);

            var worktimeStats = new WorktimeStats()
            {
                TotalWorkTimeMonthly = totalWorkTime.Days * 24 + totalWorkTime.Hours + (decimal)totalWorkTime.Minutes / 100,
                PlannedWorkTimeMonthly = plannedWorktime
            };

            return worktimeStats;
        }

        public decimal ConvertToDecimalTime(decimal worktime)
        {
            int hours = (int)worktime;
            int minutes = (int)((worktime - hours) * 100);
            decimal correctDecimalWorktime = hours + (minutes / 60.0m);
            return Math.Round(correctDecimalWorktime, 2);
        }
    }
}
