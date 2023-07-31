using GraphQL.Types;
using TimeTracker.GraphQL.Calendar.Types;

namespace TimeTracker.GraphQL.Calendar;

public class CalendarMutation : ObjectGraphType
{
    public CalendarMutation()
    {
        Field<CalendarRulesMutation>("Rules")
            .Description("Mutations for calendar rules.")
            .Resolve(context => new { });
    }
}
