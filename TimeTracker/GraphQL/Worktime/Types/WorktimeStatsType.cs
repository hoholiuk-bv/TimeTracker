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

public class WorktimeStats
{
    public decimal TotalWorkTimeMonthly { set; get; }

    public decimal PlannedWorkTimeMonthly { set; get; }
}
