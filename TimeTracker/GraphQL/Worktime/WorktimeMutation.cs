using BusinessLayer.Authentication;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Worktime.Types;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeMutation : ObjectGraphType
    {
        private readonly IWorktimeProvider worktimeProvider;
        public WorktimeMutation(IWorktimeProvider worktimeProvider, IAuthenticationService authenticationService)
        {
            this.worktimeProvider = worktimeProvider;

            Field<NonNullGraphType<BooleanGraphType>>("WorkCreation")
                .Description("work")
                .Argument<NonNullGraphType<WorktimeInputType>>("input")
                .Resolve(ResolveWorktimeCreation);
        }
        private object? ResolveWorktimeCreation(IResolveFieldContext context)
        {
            var input = context.GetArgument<WorktimeInput>("input");
            var worktime = new DataLayer.Entities.Worktime()
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(input.UserId),
                StartDate = DateTime.Parse(input.StartDate),
                FinishDate =  DateTime.Parse(input.FinishDate),
                LastEditorId = Guid.Parse(input.LastEditorId),
                IsAutoCreated = input.IsAutoCreated,
            };

            worktimeProvider.SaveWorktime(worktime);

            return true;
        }
    }