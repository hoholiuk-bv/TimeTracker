using DataLayer.Models;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Common.Types
{
    public class PagingInputType : InputObjectGraphType<Paging>
    {
        public PagingInputType()
        {
            Name = "PagingInput";

            Field<NonNullGraphType<IntGraphType>>("PageNumber");
            Field<NonNullGraphType<IntGraphType>>("PageSize");
        }
    }
}
