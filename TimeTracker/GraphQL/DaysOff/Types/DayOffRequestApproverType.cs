using DataLayer.Entities;
using GraphQL.Types;

namespace TimeTracker.GraphQL.DaysOff.Types;

public class DayOffRequestApproverType : ObjectGraphType<DayOffRequestApprover>
{
    public DayOffRequestApproverType()
    {
        Name = "DayOffRequestApprover";

        Field<IdGraphType>("Id");
        Field<StringGraphType>("Name");
        Field<StringGraphType>("Surname");
    }
}
