using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Calendar.Types
{
    public class CalendarRulesMutation : ObjectGraphType
    {
        private readonly ICalendarProvider calendarProvider;

        public CalendarRulesMutation(ICalendarProvider calendarProvider)
        {
            this.calendarProvider = calendarProvider;

            Field<BooleanGraphType>("Create")
                .Description("Creates a new calendar rule")
                .Argument<NonNullGraphType<CalendarRuleInputType>>("input")
                .Resolve(context =>
                {
                    var input = context.GetArgument<CalendarRuleInput>("input");
                    calendarProvider.CreateRule(CreateCalendarRule(input));
                    return true;
                });

            Field<BooleanGraphType>("Update")
                .Description("Updates a calendar rule")
                .Argument<NonNullGraphType<CalendarRuleInputType>>("input")
                .Resolve(context =>
                {
                    var input = context.GetArgument<CalendarRuleInput>("input");
                    calendarProvider.UpdateRule(CreateCalendarRule(input));
                    return true;
                });

            Field<BooleanGraphType>("Delete")
                    .Description("Deletes a calendar rule")
                    .Argument<NonNullGraphType<IdGraphType>>("ruleId")
                    .Resolve(context =>
                    {
                        var ruleId = context.GetArgument<Guid>("ruleId");
                        calendarProvider.DeleteRule(ruleId);
                        return true;
                    });
        }

        private CalendarRule CreateCalendarRule(CalendarRuleInput input)
        => new()
        {
            Id = input.Id ?? Guid.NewGuid(),
            Title = input.Title,
            Type = input.Type,
            ShortDayDuration = input.ShortDayDuration,
            StartDate = DateTime.Parse(input.StartDate),
            FinishDate = input.FinishDate != null ? DateTime.Parse(input.FinishDate) : null,
            IsRecurring = input.IsRecurring,
            RecurringFrequency = input.RecurringFrequency,
            RecurringPeriod = input.RecurringPeriod,
            Exceptions = input.Exceptions?.Any() ?? false ? string.Join(';', input!.Exceptions) : null,
        };
    }
}
