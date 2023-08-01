using DataLayer.Models;
using static DataLayer.Constants;

namespace DataLayer.Entities
{
    public class DayOffRequest
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime FinishDate { get; set; }

        public DayOffReason Reason { get; set; }

        public IList<DayOffRequestApprovalResult> Approvals { get; set; } = new List<DayOffRequestApprovalResult>();

        public bool IsEditable => StartDate.Date > DateTime.Now.Date;
    }
}
