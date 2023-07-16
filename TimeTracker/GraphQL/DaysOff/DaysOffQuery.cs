using DataLayer.Providers;
using GraphQL.Types;
using TimeTracker.GraphQL.DaysOff.Types;

namespace TimeTracker.GraphQL.DaysOff
{
    public class DaysOffQuery : ObjectGraphType
    {
        public DaysOffQuery(IDaysOffProvider daysOffProvider) 
        { 
            Field<ListGraphType<DayOffRequestType>>("List")
                .Description("Gets the list of day off requests.")
                .Resolve(context => daysOffProvider.GetAll());
        }
    }
}
