using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers;

public interface IWorktimeProvider
{
    Worktime SaveWorktime(Worktime worktime);

    Worktime UpdateWorktimeRecord(Worktime worktimeRecord);

    IEnumerable<Worktime> GetWorktimeRecords(Sorting? sorting, WorktimeFilter? filter, Paging? paging);
   
    int GetRecordsCount(WorktimeFilter? filter);
}
