using DataLayer.Entities;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Users.Types
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.Password);
            Field(t => t.Salt);
            Field(t => t.IsAdmin);
            Field(t => t.EmploymentDate);
            Field(t => t.EmploymentType);
        }
    }
}
