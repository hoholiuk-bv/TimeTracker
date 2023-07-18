﻿using static DataLayer.Constants;

namespace DataLayer.Entities
{
    public class DayOffRequest
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime FinishDate { get; set; }

        public DayOffReason Reason { get; set; }

        public IList<DayOffRequestApproval> Approvals { get; set; } = new List<DayOffRequestApproval>();
    }
}