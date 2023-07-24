using DataLayer.Providers;
using GraphQL.Types;
using TimeTracker.GraphQL.Worktime.Types;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeQuery : ObjectGraphType
{
    public WorktimeQuery(IWorktimeProvider worktimeProvider)
    {
        Field<ListGraphType<WorktimeType>>("worktimeRecords")
            .Description("Get list of worktimeRecords")
            .Resolve(context =>
            {
                return worktimeProvider.GetWorktimeRecords().ToList();
            });
    }
}