using BusinessLayer;
using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.GraphQL.DaysOff.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.DaysOff;

public class DaysOffMutation : ObjectGraphType
{
    private readonly IDaysOffProvider daysOffProvider;
    private readonly IUserProvider userProvider;

    public DaysOffMutation(IDaysOffProvider daysOffProvider, IUserProvider userProvider)
    {
        this.daysOffProvider = daysOffProvider;
        this.userProvider = userProvider;

        Field<NonNullGraphType<BooleanGraphType>>("RequestDayOff")
            .Description("Creates a request for a day off.")
            .Argument<NonNullGraphType<DayOffRequestInputType>>("input")
            .Argument<NonNullGraphType<IdGraphType>>("userId")
            .Resolve(context => ResolveRequest(context));

        Field<NonNullGraphType<BooleanGraphType>>("DeleteDayOffRequest")
                .Description("Deletes a day off request.")
                .Argument<NonNullGraphType<IdGraphType>>("requestId")
                .Resolve(context =>
                {
                    var requestId = context.GetArgument<Guid>("requestId");
                    var currentUser = context.RequestServices!.GetRequiredService<UserContext>().User!;
                    var request = daysOffProvider.GetRequest(requestId);
                    var daysOffCount = userProvider.GetDaysOffCount(currentUser.Id) + (request.FinishDate - request.StartDate).Days + 1;

                    daysOffProvider.DeleteDayOffRequest(requestId);

                    if (request.Reason == DayOffReason.Vacation)
                        userProvider.UpdateDaysOffCount(currentUser.Id, daysOffCount);

                    return true;
                });
    }
    private bool ResolveRequest(IResolveFieldContext context)
    {
        var input = context.GetArgument<DayOffRequestInput>("input");
        var userId = context.GetArgument<Guid>("userId");
        var currentUser = context.RequestServices!.GetRequiredService<UserContext>().User!;

        var request = new DayOffRequest()
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            StartDate = DateTime.Parse(input.StartDate),
            FinishDate = DateTime.Parse(input.FinishDate),
            Reason = input.Reason
        };

        var daysOffCount = userProvider.GetDaysOffCount(userId) - (request.FinishDate - request.StartDate).Days - 1;

        daysOffProvider.CreateRequest(request);

        if (currentUser.ApproverIds.Any() && request.Reason == DayOffReason.Vacation)
        {
            userProvider.UpdateDaysOffCount(userId, daysOffCount);
            daysOffProvider.CreateApprovals(currentUser.ApproverIds, request.Id);
        }

        return true;
    }
}
