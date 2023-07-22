using DataLayer.Entities;
using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Approvals.Types
{
    public class ApprovalType : ObjectGraphType<DayOffRequestApproval>
    {
        public ApprovalType()
        {
            Field<NonNullGraphType<IdGraphType>>("RequestId")
                .Description("The Request ID");

            Field<NonNullGraphType<StringGraphType>>("StartDate")
                .Description("The date, when the days off start.")
                .Resolve(context => context.Source.StartDate.ToShortDateString());

            Field<NonNullGraphType<StringGraphType>>("FinishDate")
                .Description("The date, when the days off end.")
                .Resolve(context => context.Source.FinishDate.ToShortDateString());

            Field<NonNullGraphType<StringGraphType>>("EmployeeName")
                .Description("The name of employee that requests days off.");

            Field<NonNullGraphType<StringGraphType>>("EmployeeSurname")
                .Description("The surname of employee that requests days off.");

            Field<NonNullGraphType<EnumerationGraphType<DayOffApprovalStatus>>>("Status")
                .Description("The status of day off request.");
        }
    }
}
