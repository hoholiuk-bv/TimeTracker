using BusinessLayer.Authentication;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using Microsoft.IdentityModel.Tokens;
using TimeTracker.GraphQL.Worktime.Types;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeMutation : ObjectGraphType
{
    private readonly IWorktimeProvider worktimeProvider;

    public WorktimeMutation(IWorktimeProvider worktimeProvider, IAuthenticationService authenticationService)
    {
        this.worktimeProvider = worktimeProvider;

        Field<NonNullGraphType<BooleanGraphType>>("WorkCreation")
            .Description("work")
            .Argument<NonNullGraphType<WorktimeInputType>>("input")
            .Resolve(ResolveWorktimeCreation);

        Field<WorktimeType>("WorktimeUpdate")
            .Description("Updating of worktime record")
            .Argument<NonNullGraphType<WorktimeInputType>>("input")
            .Resolve(context => ResolveWorktimeUpdating(context));
    }

    private object? ResolveWorktimeCreation(IResolveFieldContext context)
    {
        var input = context.GetArgument<WorktimeInput>("input");
        var worktime = new DataLayer.Entities.Worktime()
        {
            Id = Guid.NewGuid(),
            UserId = Guid.Parse(input.UserId),
            StartDate = DateTime.Parse(input.StartDate),
            FinishDate =  DateTime.Parse(input.FinishDate),
            LastEditorId = input.LastEditorId.IsNullOrEmpty() ? null : Guid.Parse(input.LastEditorId),
        };

        worktimeProvider.SaveWorktime(worktime);

        return true;
    }

    private DataLayer.Entities.Worktime ResolveWorktimeUpdating(IResolveFieldContext context)
    {
        var input = context.GetArgument<WorktimeInput>("input");

        var worktime = new DataLayer.Entities.Worktime()
        {
            Id = input.Id,
            UserId = Guid.Parse(input.UserId),
            StartDate = DateTime.Parse(input.StartDate),
            FinishDate = DateTime.Parse(input.FinishDate),
            LastEditorId = input.LastEditorId.IsNullOrEmpty() ? null : Guid.Parse(input.LastEditorId),
        };

        return worktimeProvider.UpdateWorktimeRecord(worktime);
    }
}
