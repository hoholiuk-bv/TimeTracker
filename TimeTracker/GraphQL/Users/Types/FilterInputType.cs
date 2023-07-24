using DataLayer.Models;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Users.Types
{
    public class FilterInputType : InputObjectGraphType<UserFilter>
    {
        public FilterInputType()
        {
            Field(t => t.SearchText);
            Field(t => t.StartEmploymentDate, nullable: true);
            Field(t => t.EndEmploymentDate, nullable: true);
            Field(t => t.EmploymentTypes);
        }
    }
}
