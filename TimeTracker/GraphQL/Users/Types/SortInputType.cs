using DataLayer.Models;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Users.Types
{
    public class SortInputType : InputObjectGraphType<SortModel>
    {
        public SortInputType()
        {
            Field(t => t.FieldName);
            Field(t => t.SortingOrder);
        }
    }
}
