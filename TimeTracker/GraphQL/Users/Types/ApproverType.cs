using DataLayer.Entities;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Users.Types
{
    public class ApproverType : ObjectGraphType<User>
    {
        public ApproverType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
        }
    }
}
