using System.Diagnostics;

namespace TimeTracker.Services;

public class DailyActionHostedService : IHostedService
{
    private readonly TimeSpan runTime = new TimeSpan(24, 0, 0);
    private Timer timer;

    public Task StartAsync(CancellationToken cancellationToken)
    {
        timer = new Timer(ProcessActions, null, GetRunDelay(), runTime);
        return Task.CompletedTask;
    }

    void ProcessActions(object state)
    {
        Debug.WriteLine("Hello World!");
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
}
