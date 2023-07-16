using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Common.Types;
using TimeTracker.GraphQL.DaysOff.Types;

namespace TimeTracker.GraphQL.DaysOff
{
    public class DaysOffQuery : ObjectGraphType
    {
        public DaysOffQuery(IDaysOffProvider daysOffProvider)
        {
            Field<ListGraphType<DayOffRequestType>>("List")
                .Description("Gets the list of day off requests.")
                .Argument<PagingInputType>("Paging")
                .Argument<SortingInputType>("Sorting")
                .Resolve(context =>
                {
                    var sorting = context.GetArgument<Sorting>("sorting");
                    var paging = context.GetArgument<Paging>("paging");
                    return daysOffProvider.GetRequests(sorting, paging);
                });
        }
    }
}
