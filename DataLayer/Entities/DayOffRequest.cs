using static DataLayer.Constants;

namespace DataLayer.Entities
{
    public class DayOffRequest
    {
        public Guid Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime FinishDate { get; set; }

        public DayOffReason Reason { get; set; }
    }
}
