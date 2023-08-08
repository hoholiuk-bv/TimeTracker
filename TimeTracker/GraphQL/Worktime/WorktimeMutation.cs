using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using Microsoft.IdentityModel.Tokens;
using TimeTracker.GraphQL.Worktime.Types;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeMutation : ObjectGraphType
{
    private readonly IWorktimeProvider worktimeProvider;

    public WorktimeMutation(IWorktimeProvider worktimeProvider)
    {
        this.worktimeProvider = worktimeProvider;

        Field<WorktimeType>("Create")
            .Description("Creates a new worktime record")
            .Argument<NonNullGraphType<WorktimeInputType>>("input")
            .Resolve(context => ResolveWorktimeCreation(context));

        Field<WorktimeType>("Update")
            .Description("Updates a worktime record")
            .Argument<NonNullGraphType<WorktimeInputType>>("input")
            .Resolve(context => ResolveWorktimeUpdating(context));

        Field<WorktimeType>("UpdateFinishDate")
                .Description("Updates the finish date of a worktime record by User Id")
                .Argument<StringGraphType>("userId", "User Id")
                .Resolve(context =>
                {
                    var input = context.GetArgument<UpdateWorktime>("worktime");

                    var worktime = new DataLayer.Entities.Worktime()
                    {
                        FinishDate = DateTime.Now,
                    };

                    string? userId = context.GetArgument<string?>("userId");

                    if (userId == null || !Guid.TryParse(userId, out _))
                    {
                        return null;
                    }

                    var finishDate = worktime.FinishDate ?? DateTime.Now;

                    return worktimeProvider.UpdateFinishDate(finishDate, userId);
                });
    }

    private DataLayer.Entities.Worktime ResolveWorktimeCreation(IResolveFieldContext context)
    {
        var input = context.GetArgument<WorktimeInput>("input");

        var worktime = new DataLayer.Entities.Worktime()
        {
            Id = Guid.NewGuid(),
            UserId = Guid.Parse(input.UserId),
            StartDate = DateTime.Parse(input.StartDate),
            FinishDate = !string.IsNullOrEmpty(input.FinishDate) ? DateTime.Parse(input.FinishDate) : (DateTime?)null,
            LastEditorId = Guid.Parse(input.LastEditorId),
        };

        bool isWorktimeRecordCreated = worktimeProvider.CreateWorktimeRecord(worktime) > 0;

        if (isWorktimeRecordCreated)
        {
            return worktimeProvider.GetWorktimeRecordById(worktime.Id);
        }

        return null;
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

        bool isWorktimeRecordUpdated = worktimeProvider.UpdateWorktimeRecord(worktime) > 0;

        if (isWorktimeRecordUpdated)
        {
            return worktimeProvider.GetWorktimeRecordById(worktime.Id);
        }

        return null;
    }
}
