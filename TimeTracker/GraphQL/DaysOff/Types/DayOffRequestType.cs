using DataLayer;
using DataLayer.Entities;
using GraphQL.Types;

namespace TimeTracker.GraphQL.DaysOff.Types
{
    public class DayOffRequestType : ObjectGraphType<DayOffRequest>
    {
        public DayOffRequestType()
        {
            Field<IdGraphType>("Id")
                .Description("The ID");

            Field<StringGraphType>("StartDate")
                .Description("The date, when the days off start.")
                .Resolve(context => context.Source.StartDate.ToShortDateString());

            Field<StringGraphType>("FinishDate")
                .Description("The date, when the days off end.")
                .Resolve(context => context.Source.FinishDate.ToShortDateString());

            Field<EnumerationGraphType<Constants.DayOffReason>>("Reason")
                .Description("The reason for the days off.");
        }
    }
}
