using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers;

public class WorktimeProvider : Provider, IWorktimeProvider
{
    public WorktimeProvider(IConfiguration configuration) : base(configuration) { }
    
    public int CreateWorktimeRecord(Worktime worktime)
        => Execute(Queries.Worktime.CreateWorktimeRecord, worktime);

    public Worktime? GetWorktimeRecordById(Guid id)
    => Query<Worktime?>(Queries.Worktime.GetWorktimeRecordById, new { Id = id }).FirstOrDefault();

    public Worktime? GetUnfinishedWorktimeRecordByUserId(string userId)
        => Query<Worktime>(Queries.Worktime.GetUnfinishedWorktimeRecordByUserId, new {UserId = userId}).FirstOrDefault();

    public IEnumerable<Worktime> GetWorktimeRecords(Sorting? sorting, WorktimeFilter? filter, Paging? paging)
    => Query<Worktime>(Queries.Worktime.GetWorktimeRecords(sorting, filter, paging));

    public Worktime UpdateFinishDate(DateTime finishDate, string userId)
        => Query<Worktime>(Queries.Worktime.UpdateFinishDate, new { finishDate, UserId = userId }).First();

    public int UpdateWorktimeRecord(Worktime worktimeRecord)
        => Execute(Queries.Worktime.UpdateWorktimeRecord, worktimeRecord);

    public int GetRecordCount(WorktimeFilter? filter)
        => Query<int>(Queries.Worktime.GetRecordsCount(filter)).First();

    public void CreateWorktimeRecords(IEnumerable<Worktime> worktimeRecords)
        => Execute(Queries.Worktime.CreateWorktimeRecords(worktimeRecords));
}
