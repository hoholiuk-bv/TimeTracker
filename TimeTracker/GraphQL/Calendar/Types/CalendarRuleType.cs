using DataLayer;
using DataLayer.Entities;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Calendar.Types
{
    public class CalendarRuleType : ObjectGraphType<CalendarRule>
    {
        public CalendarRuleType()
        {
            Field<IdGraphType>("Id")
                .Description("Rule ID.");

            Field<NonNullGraphType<StringGraphType>>("Title")
                .Description("Rule description");

            Field<NonNullGraphType<BooleanGraphType>>("DisplayTitle")
                .Description("Flag indicating whether title is displayed in calendar.");

            Field<NonNullGraphType<EnumerationGraphType<Constants.CalendarRuleSetupType>>>("Type")
                .Description("Rule type.");

            Field<NonNullGraphType<StringGraphType>>("StartDate")
                .Description("Rule start date.")
                .Resolve(context => context.Source.StartDate.ToShortDateString());

            Field<StringGraphType>("FinishDate")
                .Description("Rule finish date.")
                .Resolve(context => context.Source.FinishDate?.ToShortDateString());

            Field<DecimalGraphType>("ShortDayDuration")
                .Description("Duration of working day in hours if rule's type is 'ShortDate'.");

            Field<NonNullGraphType<BooleanGraphType>>("IsRecurring")
                .Description("Flag indicating whether rule is recurring.");

            Field<DecimalGraphType>("RecurringFrequency")
                .Description("Rule recurring frequency.");

            Field<EnumerationGraphType<Constants.CalendarRuleRecurringPeriod>>("RecurringPeriod")
                .Description("Rule recurring period.");

            Field<ListGraphType<DateTimeGraphType>>("Exceptions")
                .Description("List of dates when rule is not applied.")
                .Resolve(context => context.Source.Exceptions?.Split(';').Select(d => DateTime.Parse(d)).ToList());
        }
    }
}
