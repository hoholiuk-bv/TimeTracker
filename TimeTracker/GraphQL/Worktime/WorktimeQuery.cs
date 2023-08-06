using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using TimeTracker.GraphQL.Worktime.Types;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeQuery : ObjectGraphType
{
    public WorktimeQuery(IWorktimeProvider worktimeProvider, IUserProvider userProvider)
    {
        Field<ListGraphType<WorktimeType>>("Records")
            .Description("Get list of worktime records")
            .Argument<SortInputType>("sorting")
            .Argument<WorktimeFilterInputType>("filter")
            .Argument<PaginationInputType>("paging")
            .Resolve(context =>
            {
                Sorting sorting = context.GetArgument<Sorting>("sorting");
                WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");
                Paging paging = context.GetArgument<Paging>("paging");

                return worktimeProvider.GetWorktimeRecords(sorting, filter, paging).ToList();
            });

        Field<IntGraphType>("RecordsCount")
            .Description("Get records count")
            .Argument<WorktimeFilterInputType>("filter")
            .Resolve(context =>
            {
                WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");
                return worktimeProvider.GetRecordsCount(filter);
            });
        
        Field<WorktimeStatsType>("WorktimeStats")
            .Description("Get worktime statistics")
            .Argument<WorktimeFilterInputType>("filter")
            .Resolve(context =>
            {
                WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");
                var worktimeRecords = worktimeProvider.GetWorktimeRecords(null, filter, null).ToList();
                var user = userProvider.GetById(filter.UserId.ToString());

                TimeSpan totalWorkTime = TimeSpan.Zero;

                foreach (var worktime in worktimeRecords)
                {
                    totalWorkTime += worktime.FinishDate - worktime.StartDate;
                }

                var worktimeStats = new WorktimeStats()
                {
                    TotalWorkTimeMonthly = totalWorkTime.Days * 24 + totalWorkTime.Hours + (decimal)totalWorkTime.Minutes / 100,
                    PlannedWorkTimeMonthly = user.WorkingHoursCount * 20 // [20] Temporary value
                };

                return worktimeStats;
            });
    }
}
