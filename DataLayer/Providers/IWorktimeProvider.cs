using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers;

public interface IWorktimeProvider
{
    int CreateWorktimeRecord(Worktime worktime);

    Worktime? GetWorktimeRecordById(Guid id);

    Worktime? GetUnfinishedWorktimeRecordByUserId(string userId);

    IEnumerable<Worktime> GetWorktimeRecords(Sorting? sorting, WorktimeFilter? filter, Paging? paging);

    Worktime UpdateFinishDate(DateTime finishDate, string userId);

    int UpdateWorktimeRecord(Worktime worktimeRecord);
   
    int GetRecordCount(WorktimeFilter? filter);
}
