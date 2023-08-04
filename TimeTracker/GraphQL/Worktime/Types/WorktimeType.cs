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
        Field(t => t.FinishDate);
        Field<StringGraphType>("LastEditor")
            .Resolve(context => test(context));
    }

    private string test(IResolveFieldContext context)
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
