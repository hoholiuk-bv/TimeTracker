using GraphQL.Types;
using TimeTracker.GraphQL.Calendar.Types;

namespace TimeTracker.GraphQL.Calendar;

public class CalendarQuery : ObjectGraphType
{
    public CalendarQuery()
    {
        Field<CalendarRulesQuery>("Rules")
            .Description("Queries for calendar rules")
            .Resolve(context => new { });
    }
}
