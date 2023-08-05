using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
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

        Field<ListGraphType<WorktimeType>>("worktimeRecordsByUserId")
            .Description("Get list of worktimeRecords by user id")
            .Argument<GuidGraphType>("userId")
            .Argument<SortInputType>("sorting")
            .Argument<WorktimeFilterInputType>("filter")
            .Argument<PaginationInputType>("paging")
            .Resolve(context =>
            {
                Guid userId = context.GetArgument<Guid>("userId");
                Sorting sorting = context.GetArgument<Sorting>("sorting");
                WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");
                Paging paging = context.GetArgument<Paging>("paging");

                return worktimeProvider.GetWorktimeRecordsByUserId(userId, sorting, filter, paging).ToList(); ;
            });

        Field<IntGraphType>("RecordsCount")
            .Description("Get records count")
            .Argument<GuidGraphType>("userId")
            .Argument<WorktimeFilterInputType>("filter")
            .Resolve(context =>
            {
                Guid userId = context.GetArgument<Guid>("userId");
                WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");
                return worktimeProvider.GetRecordsCount(userId, filter);
            });
    }
}
