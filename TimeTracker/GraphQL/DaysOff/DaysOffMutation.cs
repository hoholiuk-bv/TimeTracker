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
    }
    private bool ResolveRequest(IResolveFieldContext context)
    {
        var input = context.GetArgument<DayOffRequestInput>("input");
        var currentUserId = context.RequestServices!.GetRequiredService<UserContext>().User!.Id;

        var request = new DayOffRequest()
        {
            Id = Guid.NewGuid(),
            UserId = currentUserId,
            StartDate = DateTime.Parse(input.StartDate),
            FinishDate = DateTime.Parse(input.FinishDate),
            Reason = DayOffReason.Vacation
        };

        daysOffProvider.CreateRequest(request);
        var approverIds = daysOffProvider.GetApprovers(currentUserId).Select(approver=> approver.Id);
        if (!approverIds.Any())
            return true;

        daysOffProvider.CreateApprovals(approverIds, request.Id);

        return true;
    }
}
