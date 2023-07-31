using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.DaysOff.Types
{
    public class DayOffRequestInputType : InputObjectGraphType<DayOffRequestInput>
    {
        public DayOffRequestInputType()
        {
            Name="DayOffRequestInput";

            Field<NonNullGraphType<StringGraphType>>("StartDate");
            Field<NonNullGraphType<StringGraphType>>("FinishDate");
            Field<NonNullGraphType<EnumerationGraphType<DayOffReason>>>("Reason");
        }
    }

    public class DayOffRequestInput 
    { 
        public string StartDate { get; set; }

        public string FinishDate { get; set; }

        public DayOffReason Reason { get; set; }
    }
}
