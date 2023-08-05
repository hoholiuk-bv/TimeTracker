using DataLayer.Entities;
using DataLayer.Models;

namespace DataLayer.Providers;

public interface IWorktimeProvider
{
    void SaveWorktime(Worktime worktime);

    IEnumerable<Worktime> GetWorktimeRecords();

    IEnumerable<Worktime> GetWorktimeRecordsByUserId(Sorting sorting, WorktimeFilter? filter, Paging paging);
   
    int GetRecordsCount(WorktimeFilter? filter);
}
