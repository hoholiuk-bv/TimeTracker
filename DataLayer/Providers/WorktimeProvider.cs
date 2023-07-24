using DataLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers;

public class WorktimeProvider :  Provider, IWorktimeProvider
{
    public WorktimeProvider(IConfiguration configuration) : base(configuration) { }

    public void SaveWorktime(Worktime worktime)
        => Execute(Queries.Worktime.SaveWorktime, worktime);
    
    public IEnumerable<Worktime> GetWorktimeRecords()
        => Query<Worktime>(Queries.Worktime.GetWorktimeRecords);
}