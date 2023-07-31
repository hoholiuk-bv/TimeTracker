using DataLayer.Models;
using GraphQL.Types;

namespace TimeTracker.GraphQL.DaysOff.Types
{
    public class DayOffRequestFilterInputType : InputObjectGraphType<DayOffRequestFilter>
    {
        public DayOffRequestFilterInputType()
        {
            Name = "DayOffRequestFilterInput";
            Field<GuidGraphType>("RequestId");
            Field<GuidGraphType>("UserId");
        }
    }
}
