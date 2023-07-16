namespace DataLayer.Entities;

public class DayOffRequestApproval
{
    public Guid RequestId { get; set; }

    public Guid ApproverId { get; set; }

    public bool IsApproved { get; set; }
}
