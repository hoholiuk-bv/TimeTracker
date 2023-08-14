using DataLayer;
using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Calendar.Types
{
    public class CalendarRuleInputType : InputObjectGraphType<CalendarRuleInput>
    {
        public CalendarRuleInputType()
        {
            Name = "CalendarRuleInput";

            Field<GuidGraphType>("Id");
            Field<NonNullGraphType<StringGraphType>>("Title");
            Field<NonNullGraphType<EnumerationGraphType<Constants.CalendarRuleSetupType>>>("Type");
            Field<DecimalGraphType>("ShortDayDuration");
            Field<NonNullGraphType<StringGraphType>>("StartDate");
            Field<StringGraphType>("FinishDate");
            Field<NonNullGraphType<BooleanGraphType>>("IsRecurring");
            Field<IntGraphType>("RecurringFrequency");
            Field<EnumerationGraphType<CalendarRuleRecurringPeriod>>("RecurringPeriod");
            Field<ListGraphType<StringGraphType>>("Exceptions");
        }
    }

    public class CalendarRuleInput
    {
        public Guid? Id { get; set; }

        public string Title { get; set; } = null!;

        public Constants.CalendarRuleSetupType Type { get; set; }

        public decimal? ShortDayDuration { get; set; }

        public string StartDate { get; set; } = null!;

        public string? FinishDate { get; set; }

        public bool IsRecurring { get; set; }

        public int RecurringFrequency { get; set; }

        public CalendarRuleRecurringPeriod RecurringPeriod { get; set; }

        public List<string> Exceptions { get; set; } = null!;
    }
}
