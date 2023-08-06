using DataLayer.Entities;

namespace DataLayer.Providers;

public interface IWorktimeProvider
{
    void SaveWorktime(Worktime worktime);

    void UpdateFinishWorktime(DateTime finishDate, string userId);

    Worktime? GetWorktimeRecords(string userId);
    
   Worktime? GetWorktimeRecord(string userId);

}