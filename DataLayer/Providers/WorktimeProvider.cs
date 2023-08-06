using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers;

public class WorktimeProvider : Provider, IWorktimeProvider
{
    public WorktimeProvider(IConfiguration configuration) : base(configuration) { }

    public Worktime SaveWorktime(Worktime worktime)
        => Query<Worktime>(Queries.Worktime.SaveWorktime, worktime).First();
    
    public Worktime UpdateWorktimeRecord(Worktime worktimeRecord)
        => Query<Worktime>(Queries.Worktime.UpdateWorktimeRecord, worktimeRecord).First();

    public IEnumerable<Worktime> GetWorktimeRecords(Sorting? sorting, WorktimeFilter? filter, Paging? paging)
        => Query<Worktime>(Queries.Worktime.GetWorktimeRecords(sorting, filter, paging));

    public int GetRecordsCount(WorktimeFilter? filter)
        => Query<int>(Queries.Worktime.GetRecordsCount(filter)).First();
}
