using GraphQL.Types;

namespace TimeTracker.GraphQL.Worktime.Types;

public class WorktimeType : ObjectGraphType<DataLayer.Entities.Worktime>
{
    public WorktimeType()
    {
        Field(t => t.Id, type: typeof(GuidGraphType));
        Field(t => t.UserId);
        Field(t => t.StartDate);
        Field(t => t.FinishDate, nullable: true);
        Field(t => t.IsAutoCreated);
        Field(t => t.LastEditorId);

    }
}