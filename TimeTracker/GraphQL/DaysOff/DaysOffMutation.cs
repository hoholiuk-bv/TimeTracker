using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.MicrosoftDI;
using GraphQL.Types;
using System;
using TimeTracker.GraphQL.DaysOff.Types;
using TimeTracker.GraphQL.Users.Types;

namespace TimeTracker.GraphQL.DaysOff
{
    public class DaysOffMutation : ObjectGraphType
    {
        private readonly IDaysOffProvider daysOffProvider;

        public DaysOffMutation(IDaysOffProvider daysOffProvider)
        {
            this.daysOffProvider = daysOffProvider;

            Field<NonNullGraphType<BooleanGraphType>>("RequestDayOff")
                .Description("Creates a request for a day off.")
                .Argument<NonNullGraphType<DayOffRequestInputType>>("input")
                .Resolve(ResolveRequest);
        }
        private object? ResolveRequest(IResolveFieldContext context)
        {
            var newRequest = new DayOffRequest();
            var input = context.GetArgument<DayOffRequestInput>("input");

            newRequest.Id = Guid.NewGuid();
            newRequest.StartDate = DateTime.Parse(input.StartDate);
            newRequest.FinishDate = DateTime.Parse(input.FinishDate);
            newRequest.Reason = input.Reason;

            daysOffProvider.Create(newRequest);

            return true;
        }
    }
}
