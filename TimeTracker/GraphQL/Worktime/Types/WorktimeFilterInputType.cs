using DataLayer.Models;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Worktime.Types
{
    public class WorktimeFilterInputType : InputObjectGraphType<WorktimeFilter>
    {
        public WorktimeFilterInputType()
        {
            Name = "WorktimeFilterInput";

            Field(t => t.UserId);
            Field(t => t.Year);
            Field(t => t.Month);
        }
    }
}
