using BusinessLayer.Helpers;
using DataLayer.Entities;
using DataLayer.Models;
using DataLayer.Providers;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using static DataLayer.Constants;
using Worktime = DataLayer.Entities.Worktime;

namespace TimeTracker.Services;

public class DailyActionHostedService : IHostedService
{
    private readonly TimeSpan runTime = new TimeSpan(24, 0, 0);
    private Timer timer;
    private readonly IUserProvider userProvider;
    private readonly IWorktimeProvider worktimeProvider;
    private readonly ICalendarProvider calendarProvider;
    private readonly IDaysOffProvider daysOffProvider;

    public DailyActionHostedService(
        IUserProvider userProvider,
        IWorktimeProvider worktimeProvider,
        ICalendarProvider calendarProvider,
        IDaysOffProvider daysOffProvider)
    {
        this.userProvider = userProvider;
        this.worktimeProvider = worktimeProvider;
        this.calendarProvider = calendarProvider;
        this.daysOffProvider = daysOffProvider;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        //timer = new Timer(ProcessActions, null, GetRunDelay(), runTime);
        timer = new Timer(ProcessActions, null, 0, 10000);
        return Task.CompletedTask;
    }

    void ProcessActions(object state)
    {
        ResolveWorktimeAction();
        ResolveDaysOffAction();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    private TimeSpan GetRunDelay()
    {
        var curentTime = TimeSpan.Parse(DateTime.Now.TimeOfDay.ToString("hh\\:mm"));
        return runTime - curentTime;
    }

    private void ResolveWorktimeAction()
    {
        var calendarRules = calendarProvider.GetCalendarRules();
        var ruleForCurrentDay = calendarRules.FirstOrDefault(calendarRule => CalendarHelper.CheckIfDateMatchesRule(DateTime.Now, calendarRule));

        if (ruleForCurrentDay != null && ruleForCurrentDay?.Type != CalendarRuleSetupType.ShortDay)
            return;

        var fullTimerIds = userProvider.GetAllFullTimerIds();
        List<Worktime> worktimeRecords = new List<Worktime>();
        var today = DateTime.Now;
        var workDuration = ruleForCurrentDay?.Type == CalendarRuleSetupType.ShortDay ? ruleForCurrentDay.ShortDayDuration!.Value : 8.0m;
        int hours = (int)Math.Truncate(workDuration);
        var minutes = workDuration - (int)Math.Truncate(workDuration);


        foreach (var fullTimerId in fullTimerIds)
        {
            var filter = new DayOffRequestFilter { UserId = fullTimerId };
            var userRequests = daysOffProvider.GetRequests(filter);
            var dayOffForCurrentDay = userRequests.FirstOrDefault(request => DaysOffHelper.CheckIfDateMatchesDayOff(DateTime.Now, request));

            if (dayOffForCurrentDay != null)
                continue;

            var newRecord = new Worktime
            {
                Id = Guid.NewGuid(),
                UserId = fullTimerId,
                StartDate = new DateTime(today.Year, today.Month, today.Day, 9, 0, 0),
                FinishDate = new DateTime(today.Year, today.Month, today.Day, 9 + hours, (int)minutes, 0),
                LastEditorId = null
            };

            worktimeRecords.Add(newRecord);
        }
        worktimeProvider.CreateWorktimeRecords(worktimeRecords);
    }

    private void ResolveDaysOffAction()
    {
        var users = userProvider.GetAllUsers();

        if (DateTime.Now.Day != 1)
            return;

        foreach (var user in users) {
            if (!user.IsActive)
                continue;

            userProvider.UpdateDaysOffCount(user.Id, 2);
        }
    }
}
