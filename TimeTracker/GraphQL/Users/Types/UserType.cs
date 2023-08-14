using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL.Types;
using TimeTracker.GraphQL.DaysOff.Types;

namespace TimeTracker.GraphQL.Users.Types
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType(IDaysOffProvider daysOffProvider)
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.IsAdmin);
            Field(t => t.IsActive);
            Field(t => t.EmploymentDate);
            Field(t => t.EmploymentType);
            Field(t => t.WorkingHoursCount);
            Field(t => t.DaysOffCount);
            Field<ListGraphType<DayOffRequestApproverType>>("Approvers")
                .Resolve(context => daysOffProvider.GetApprovers(context.Source.ApproverIds));
        }
    }
}
