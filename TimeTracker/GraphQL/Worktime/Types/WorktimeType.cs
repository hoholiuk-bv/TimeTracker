using GraphQL;
using GraphQL.Types;
using DataLayer.Providers;

namespace TimeTracker.GraphQL.Worktime.Types;

public class WorktimeType : ObjectGraphType<DataLayer.Entities.Worktime>
{
    public WorktimeType()
    {
        Field(t => t.Id, type: typeof(GuidGraphType));
        Field(t => t.UserId);
        Field(t => t.StartDate);
        Field(t => t.FinishDate, nullable: true);
        Field(t => t.LastEditorId, nullable: true);
        Field<StringGraphType>("LastEditorName")
            .Resolve(context => GetLastEditorName(context));
    }

    private string GetLastEditorName(IResolveFieldContext context)
    {
        var worktime = context.Source as DataLayer.Entities.Worktime;

        if (worktime != null)
        {
            var lastEditorId = worktime.LastEditorId;

            if (lastEditorId != null)
            {
                var userProvider = context.RequestServices.GetRequiredService<IUserProvider>();
                var lastEditor = userProvider.GetById(lastEditorId.Value.ToString());

                return $"{lastEditor.Name} {lastEditor.Surname}";
            }
        }

        return "System";
    }
}
