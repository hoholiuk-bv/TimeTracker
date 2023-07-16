using DataLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataLayer.Providers
{
    public class DaysOffProvider : Provider, IDaysOffProvider
    {
        public DaysOffProvider(IConfiguration configuration) : base(configuration) { }

        public void Create(DayOffRequest dayOffRequest)
            => Execute(Queries.DaysOff.Request, dayOffRequest);

        public List<DayOffRequest> GetAll()
            => Query<DayOffRequest>(Queries.DaysOff.GetAll);
    }
}
