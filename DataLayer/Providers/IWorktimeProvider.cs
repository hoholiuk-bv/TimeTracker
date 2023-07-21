using DataLayer.Entities;

namespace DataLayer.Providers;

public interface IWorktimeProvider
{
    void SaveWorktime(Worktime worktime);

    IEnumerable<Worktime> GetWorktimeRecords();
}