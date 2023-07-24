using static DataLayer.Constants;

namespace DataLayer.Entities;

public class DayOffRequestApproval
{
    public Guid RequestId { get; set; }

    public string EmployeeName { get; set; } = null!;

    public string EmployeeSurname { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime FinishDate { get; set; }

    public DayOffApprovalStatus Status { get; set; }

    public bool IsEditable => StartDate.Date > DateTime.Now.Date;
}
