using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.Extensions.Configuration;
using static DataLayer.Providers.Queries;

namespace DataLayer.Providers
{
    public class CalendarProvider : Provider, ICalendarProvider
    {
        public CalendarProvider(IConfiguration configuration) : base(configuration)
        {
        }

        public void CreateRule(CalendarRule rule)
            => Execute(CalendarRules.Create, rule);

        public void DeleteRule(Guid ruleId)
            => Execute(CalendarRules.Delete, new { RuleId = ruleId });

        public List<CalendarRule> GetCalendarRules(Sorting sorting, Paging paging)
            => Query<CalendarRule>(CalendarRules.GetList(sorting, paging));

        public void UpdateRule(CalendarRule rule)
            => Execute(CalendarRules.Update, rule);
    }
}
