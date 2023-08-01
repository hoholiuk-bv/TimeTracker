using BusinessLayer;
using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.DaysOff.Types;
using static DataLayer.Constants;

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
            .Resolve(context => ResolveRequest(context));

        Field<NonNullGraphType<BooleanGraphType>>("DeleteDayOffRequest")
                .Description("Deletes a day off request.")
                .Argument<NonNullGraphType<IdGraphType>>("requestId")
                .Resolve(context =>
                {
                    var requestId = context.GetArgument<Guid>("requestId");
                    daysOffProvider.DeleteDayOffRequest(requestId);

                    return true;
                });
    }
    private bool ResolveRequest(IResolveFieldContext context)
    {
        var input = context.GetArgument<DayOffRequestInput>("input");
        var currentUser = context.RequestServices!.GetRequiredService<UserContext>().User!;

        var request = new DayOffRequest()
        {
            Id = Guid.NewGuid(),
            UserId = currentUser.Id,
            StartDate = DateTime.Parse(input.StartDate),
            FinishDate = DateTime.Parse(input.FinishDate),
            Reason = DayOffReason.Vacation
        };

        daysOffProvider.CreateRequest(request);

        if (currentUser.ApproverIds.Any())
            daysOffProvider.CreateApprovals(currentUser.ApproverIds, request.Id);

        return true;
    }
}
