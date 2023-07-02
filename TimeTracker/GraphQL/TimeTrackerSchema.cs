using GraphQL.Types;

namespace TimeTracker.GraphQL
{
    public class TimeTrackerSchema : Schema
    {
        public TimeTrackerSchema(IServiceProvider provider, TimeTrackerQuery timeTrackerQuery, TimeTrackerMutation timeTrackerMutation)
: base(provider)
        {
            Query = timeTrackerQuery;
            //Mutation = timeTrackerMutation;
        }
    }
}
