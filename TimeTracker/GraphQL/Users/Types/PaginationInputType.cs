using DataLayer.Models;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Users.Types
{
    public class PaginationInputType : InputObjectGraphType<Paging>
    {
        public PaginationInputType()
        {
            Field(t => t.PageNumber);
            Field(t => t.PageSize);
        }
    }
}
