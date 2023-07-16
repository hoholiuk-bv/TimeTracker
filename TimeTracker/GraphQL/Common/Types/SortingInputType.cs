using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Common.Types
{
    public class SortingInputType : InputObjectGraphType<SortingInput>
    {
        SortingInputType() 
        {
            Name = "SortingInput";
            Field<NonNullGraphType<StringGraphType>>("SortingField");
            Field<NonNullGraphType<EnumerationGraphType<SortingType>>>("SortingType");
        }
    }

    public class SortingInput 
    {
        public string SortingField { get; set; }

        public SortingType SortingType { get; set; }
    }
}
