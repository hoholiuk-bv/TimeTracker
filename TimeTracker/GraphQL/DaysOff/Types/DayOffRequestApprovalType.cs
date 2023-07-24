using DataLayer.Entities;
using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.DaysOff.Types
{
    public class DayOffRequestApprovalType : ObjectGraphType<DayOffRequestApprovalResult>
    {
        public DayOffRequestApprovalType()
        {
            Name = "DayOffRequestApproval";
            Field<NonNullGraphType<DayOffRequestApproverType>>("Approver");
            Field<NonNullGraphType<EnumerationGraphType<DayOffApprovalStatus>>>("Status");
        }
    }
}
