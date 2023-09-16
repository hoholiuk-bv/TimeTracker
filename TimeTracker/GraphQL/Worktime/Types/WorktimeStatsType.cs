using DataLayer.Models;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Worktime.Types;

public class WorktimeStatsType : ObjectGraphType<WorktimeStats>
{
    public WorktimeStatsType()
    {
        Field(t => t.TotalWorkTimeMonthly);
        Field(t => t.PlannedWorkTimeMonthly);
    }
}
