using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;

namespace TimeTracker.GraphQL.Worktime.Types;

public class UpdateWorktimeType : InputObjectGraphType<UpdateWorktime>
{
    public UpdateWorktimeType()
    {
        Field(t => t.finishDate);
    }
}

public class UpdateWorktime
{
    public DateTime finishDate { get; set; }
}