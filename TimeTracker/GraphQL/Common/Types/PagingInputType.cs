using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Common.Types
{
    public class PagingInputType : InputObjectGraphType<SortingInput>
    {
        PagingInputType()
        {
            Name = "PagingInput";

            Field<NonNullGraphType<IntGraphType>>("PageNumber");
            Field<NonNullGraphType<IntGraphType>>("PageSize");
        }
    }

    public class PagingInput
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }
    }
}
