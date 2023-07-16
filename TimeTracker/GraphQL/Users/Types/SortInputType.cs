using DataLayer.Models;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Users.Types
{
    public class SortInputType : InputObjectGraphType<Sorting>
    {
        public SortInputType()
        {
            Field(t => t.SortingField);
            Field(t => t.SortingOrder);
        }
    }
}
