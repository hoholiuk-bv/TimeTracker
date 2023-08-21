using DataLayer.Entities;
using static DataLayer.Constants;

namespace BusinessLayer.Helpers
{
    public static class CalendarHelper
    {
        public static bool CheckIfDateMatchesRule(DateTime date, CalendarRule rule)
        {
            var ruleStartDate = rule.StartDate.Date;
            var ruleFinishDate = rule.FinishDate?.Date;
            var ruleExceptions = rule.Exceptions?.Split(';').Select(e => DateTime.Parse(e).Date) ?? new List<DateTime>();
            date = date.Date;

            if (ruleExceptions?.Any(exceptionDate => DateTime.Compare(exceptionDate, date) == 0) ?? false)
                return false;

            if (DateTime.Compare(date, ruleStartDate) < 0 || (ruleFinishDate != null && DateTime.Compare(date, ruleStartDate) > 0))
                return false;

            if (!rule.IsRecurring)
                return DateTime.Compare(date, ruleStartDate) == 0;

            if (rule.RecurringPeriod == CalendarRuleRecurringPeriod.Day)
                return CheckIfDateMatchesRecurringOnDays(date, ruleStartDate, rule.RecurringFrequency);

            if (rule.RecurringPeriod == CalendarRuleRecurringPeriod.Week)
                return CheckIfDateMatchesRecurringOnDays(date, ruleStartDate, rule.RecurringFrequency * 7);

            if (rule.RecurringPeriod == CalendarRuleRecurringPeriod.Month)
                return CheckIfDateMatchesRecurringOnMonths(date, ruleStartDate, rule.RecurringFrequency);

            if (rule.RecurringPeriod == CalendarRuleRecurringPeriod.Year)
                return CheckIfDateMatchesRecurringOnYears(date, ruleStartDate, rule.RecurringFrequency);

            return true;
        }

        public static bool CheckIfDateMatchesRecurringOnDays(DateTime date, DateTime ruleStartDate, int recurringFrequencyInDays)
        {
            var differenceInDays = date.Date.Subtract(ruleStartDate.Date).Days;
            return differenceInDays % recurringFrequencyInDays == 0;
        }

        public static bool CheckIfDateMatchesRecurringOnMonths(DateTime date, DateTime ruleStartDate, int recurringFrequencyInMonths)
        {
            var differenceInMonth = Math.Abs(date.Month - ruleStartDate.Month);
            return differenceInMonth % recurringFrequencyInMonths == 0 && date.Date == ruleStartDate.Date;
        }

        public static bool CheckIfDateMatchesRecurringOnYears(DateTime date, DateTime ruleStartDate, int recurringFrequencyInYears)
        {
            var differenceInYear = Math.Abs(date.Year - ruleStartDate.Year);
            return differenceInYear % recurringFrequencyInYears == 0 && date.Month == ruleStartDate.Month && date.Date == ruleStartDate.Date;
        }
    }
}
