using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers;

public class WorktimeProvider : Provider, IWorktimeProvider
{
    public WorktimeProvider(IConfiguration configuration) : base(configuration) { }

    public void SaveWorktime(Worktime worktime)
        => Execute(Queries.Worktime.SaveWorktime, worktime);

    public IEnumerable<Worktime> GetWorktimeRecords()
        => Query<Worktime>(Queries.Worktime.GetWorktimeRecords);

    public IEnumerable<Worktime> GetWorktimeRecordsByUserId(Guid userId, Sorting sorting, WorktimeFilter? filter, Paging paging)
        => Query<Worktime>(Queries.Worktime.GetWorktimeRecordsByUserId(sorting, filter, paging), new { UserId = userId });

    public int GetRecordsCount(Guid userId, WorktimeFilter? filter)
        => Query<int>(Queries.Worktime.GetRecordsCount(filter), new { UserId = userId }).First();
}
