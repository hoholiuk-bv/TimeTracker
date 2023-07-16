using DataLayer.Models;
using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Common.Types
{
    public class SortingInputType : InputObjectGraphType<Sorting>
    {
        public SortingInputType() 
        {
            Name = "SortingInput";
            Field<NonNullGraphType<StringGraphType>>("SortingField");
            Field<NonNullGraphType<EnumerationGraphType<SortingOrder>>>("SortingOrder");
        }
    }
}
