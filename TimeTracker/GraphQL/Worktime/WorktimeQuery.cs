using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Worktime.Types;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeQuery : ObjectGraphType
{
    public WorktimeQuery(IWorktimeProvider worktimeProvider)
    {
        Field<WorktimeType>("worktimeRecord")
            .Description("Get list of worktimeRecords")
            .Argument<StringGraphType>("id", "User Id")
            .Resolve(context =>
            {
                string? userId = context.GetArgument<string?>("id");

                if (userId == null || !Guid.TryParse(userId, out _))
                {
                    return null;
                }
                
                return worktimeProvider.GetWorktimeRecord(userId);
            });
        
        Field<WorktimeType>("worktimeRecords")
            .Description("Get list of worktimeRecords")
            .Argument<StringGraphType>("id", "User Id")
            .Resolve(context =>
            {
                string? userId = context.GetArgument<string?>("id");

                if (userId == null || !Guid.TryParse(userId, out _))
                {
                    return null;
                }

                return worktimeProvider.GetWorktimeRecords(userId);
            });
    }
    }

