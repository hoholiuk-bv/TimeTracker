using static DataLayer.Constants;

namespace DataLayer.Entities;

public class CalendarRule
{
    public Guid Id { get; set; }

    public string Title { get; set; } = null!;

    public CalendarRuleSetupType Type { get; set; }

    public decimal? ShortDayDuration { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? FinishDate { get; set; }

    public bool IsRecurring { get; set; }

    public int RecurringFrequency { get; set; }

    public CalendarRuleRecurringPeriod RecurringPeriod { get; set; }

    public string? Exceptions { get; set; }
}
