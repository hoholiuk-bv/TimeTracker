using BusinessLayer;
using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.DaysOff.Types;

namespace TimeTracker.GraphQL.DaysOff;

public class DaysOffMutation : ObjectGraphType
{
    private readonly IDaysOffProvider daysOffProvider;

    public DaysOffMutation(IDaysOffProvider daysOffProvider)
    {
        this.daysOffProvider = daysOffProvider;

        Field<NonNullGraphType<BooleanGraphType>>("RequestDayOff")
            .Description("Creates a request for a day off.")
            .Argument<NonNullGraphType<DayOffRequestInputType>>("input")
            .Resolve(ResolveRequest);
    }
    private object? ResolveRequest(IResolveFieldContext context)
    {
        var input = context.GetArgument<DayOffRequestInput>("input");
        var userContext = context.RequestServices!.GetRequiredService<UserContext>();

        var newRequest = new DayOffRequest()
        {
            Id = Guid.NewGuid(),
            UserId = userContext.User!.Id,
            StartDate = DateTime.Parse(input.StartDate),
            FinishDate = DateTime.Parse(input.FinishDate),
            Reason = input.Reason
        };

        daysOffProvider.CreateRequest(newRequest);

        return true;
    }
}
