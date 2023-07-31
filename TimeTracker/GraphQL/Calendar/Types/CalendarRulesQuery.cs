using DataLayer.Entities;
using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Common.Types;

namespace TimeTracker.GraphQL.Calendar.Types
{
    public class CalendarRulesQuery : ObjectGraphType
    {
        private readonly ICalendarProvider calendarProvider;

        public CalendarRulesQuery(ICalendarProvider calendarProvider)
        {
            this.calendarProvider = calendarProvider;

            Field<ListGraphType<CalendarRuleType>>("List")
                .Description("Gets the list of calendar rules")
                .Argument<PagingInputType>("Paging")
                .Argument<SortingInputType>("Sorting")
                .Resolve(context => ResolveList(context));
        }

        private List<CalendarRule> ResolveList(IResolveFieldContext context)
        {
            var sorting = context.GetArgument<Sorting>("sorting");
            var paging = context.GetArgument<Paging>("paging");

            return calendarProvider.GetCalendarRules(sorting, paging);
        }
    }
}
