using GraphQL.Types;
using TimeTracker.GraphQL.Common.Types;

namespace TimeTracker.GraphQL.DaysOff.Types
{
    public class DayOffRequestFilterInputType : InputObjectGraphType<DayOffRequestFilterInput>
    {
        DayOffRequestFilterInputType() 
        {
            Name = "DayOffRequestFilter";

            Field<SortingInputType>("Sorting");
            Field<PagingInputType>("Paging");
        }  
    }

    public class DayOffRequestFilterInput 
    {
        public SortingInput Sorting { get; set; }

        public PagingInput Paging { get; set; }
    }
}
