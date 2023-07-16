using DataLayer.Entities;
using static DataLayer.Constants;

namespace DataLayer.Providers
{
    public interface IDaysOffProvider
    {
        void Create(DayOffRequest dayOffRequest);

        List<DayOffRequest> GetAll();
    }
}
