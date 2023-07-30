namespace DataLayer.Models;

public class DayOffRequestFilter
{
    public Guid? RequestId { get; set; }

    public Guid? UserId { get; set; }

    public DateTime? StartDate { get; set; }
}
