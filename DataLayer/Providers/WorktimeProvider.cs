using DataLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers;

public class WorktimeProvider :  Provider, IWorktimeProvider
{
    public WorktimeProvider(IConfiguration configuration) : base(configuration) { }

    public void SaveWorktime(Worktime worktime)
        => Execute(Queries.Worktime.SaveWorktime, worktime);
    
    public void UpdateFinishWorktime(DateTime finishDate, string userId)
        => Execute(Queries.Worktime.UpdateWorktime, new { finishDate, UserId = userId });
    
    public Worktime? GetWorktimeRecords(string userId)
        => Query<Worktime>(Queries.Worktime.GetWorktimeRecords, new { UserId = userId }).FirstOrDefault();
    
    public Worktime? GetWorktimeRecord(string userId)
        => Query<Worktime>(Queries.Worktime.GetWorktimeRecord, new {UserId = userId}).FirstOrDefault();
}