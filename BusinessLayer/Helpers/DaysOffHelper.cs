using DataLayer.Entities;
using static DataLayer.Constants;

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

        public static int GetWorkingDaysCount(int year, int month, List<CalendarRule>? calendarRules, List<DayOffRequest>? userDayOffRequests, List<DayOffRequestApproval> approvals)
        {
            int daysCountInMonth = DateTime.DaysInMonth(year, month);

            List<DateTime> dateList = Enumerable.Range(1, daysCountInMonth).Select(day => new DateTime(year, month, day)).ToList();

            int workingDaysCount = dateList.Count(date =>
            {
                var ruleForCurrentDay = calendarRules.FirstOrDefault(calendarRule => CalendarHelper.CheckIfDateMatchesRule(date, calendarRule));

                if (ruleForCurrentDay != null && (ruleForCurrentDay.Type == CalendarRuleSetupType.NonWorkingDay || ruleForCurrentDay.Type == CalendarRuleSetupType.Holiday))
                {
                    return false;
                }

                var dayOffForCurrentDay = userDayOffRequests.FirstOrDefault(request => CheckIfDateMatchesDayOff(date, request));

                if (dayOffForCurrentDay != null)
                {
                    var approvalForDayOff = approvals.FirstOrDefault(approval => approval.RequestId == dayOffForCurrentDay.Id && approval.Status == DayOffApprovalStatus.Approved);

                    if (approvalForDayOff != null)
                    {
                        return false;
                    }
                }

                return true;
            });

            return workingDaysCount;
        }
    }
}
