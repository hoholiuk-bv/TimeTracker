using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Worktime.Types;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeQuery : ObjectGraphType
{
    public WorktimeQuery(IWorktimeProvider worktimeProvider, IUserProvider userProvider)
    {
        Field<ListGraphType<WorktimeType>>("worktimeRecords")
            .Description("Get list of worktimeRecords")
            .Resolve(context =>
            {
                return worktimeProvider.GetWorktimeRecords().ToList();
            });

        Field<ListGraphType<WorktimeType>>("worktimeRecordsByUserId")
            .Description("Get list of worktimeRecords by user id")
            .Argument<GuidGraphType>("userId")
            .Resolve(context =>
            {
                Guid userId = context.GetArgument<Guid>("userId");
                return worktimeProvider.GetWorktimeRecordsByUserId(userId).ToList(); ;
            });
    }
}
