using static DataLayer.Constants;

namespace DataLayer.Entities
{
    public class DayOffRequestApprovalResult
    {
        public DayOffRequestApprover Approver { get; set; } = null!;

        public DayOffApprovalStatus Status { get; set; }
    }
}
