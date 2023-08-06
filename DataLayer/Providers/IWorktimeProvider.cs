using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers;

public interface IWorktimeProvider
{
    void SaveWorktime(Worktime worktime);

    Worktime UpdateWorktimeRecord(Worktime worktimeRecord);

    IEnumerable<Worktime> GetWorktimeRecords(Sorting? sorting, WorktimeFilter? filter, Paging? paging);
   
    int GetRecordsCount(WorktimeFilter? filter);
}
