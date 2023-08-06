using GraphQL.Types;

namespace TimeTracker.GraphQL.Worktime.Types;

public class WorktimeInputType : InputObjectGraphType<WorktimeInput>
{
    public WorktimeInputType()
    {
        Name = "WorkInput";
        Field<NonNullGraphType<StringGraphType>>("UserId");
        Field<NonNullGraphType<StringGraphType>>("StartDate");
        Field<StringGraphType>("FinishDate");
        Field<BooleanGraphType>("IsAutoCreated");
        Field<NonNullGraphType<StringGraphType>>("LastEditorId");

    }

}

public class WorktimeInput
{
    public string UserId { get; set; }

    public string StartDate { get; set; } = null!;

    public string? FinishDate { get; set; } = null!;

    public bool IsAutoCreated { get; set; }

    public string LastEditorId { get; set; }
        
}
