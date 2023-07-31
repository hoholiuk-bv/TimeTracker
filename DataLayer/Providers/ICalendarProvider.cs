using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers
{
    public interface ICalendarProvider
    {
        public List<CalendarRule> GetCalendarRules(Sorting sorting, Paging paging);

        public void CreateRule(CalendarRule rule);

        public void UpdateRule(CalendarRule rule);

        public void DeleteRule(Guid ruleId);
    }
}
