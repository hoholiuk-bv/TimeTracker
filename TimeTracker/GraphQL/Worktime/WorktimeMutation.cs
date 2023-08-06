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
            
            Field<NonNullGraphType<BooleanGraphType>>("WorktimeUpdate")
                .Description("Update worktime")
                .Argument<StringGraphType>("id", "User Id")
                .Resolve(context =>
                {
                    var input = context.GetArgument<UpdateWorktime>("worktime");

                    var worktime = new DataLayer.Entities.Worktime()
                    {
                        //FinishDate = input.finishDate,
                        FinishDate = DateTime.Now,
                    };
                    string? userId = context.GetArgument<string?>("id");

                    if (userId == null || !Guid.TryParse(userId, out _))
                    {
                        return null;
                    }
                    var finishDate = worktime.FinishDate ?? DateTime.Now;
                    worktimeProvider.UpdateFinishWorktime(finishDate, userId);
                    return true;
                });
        }
        private object? ResolveWorktimeCreation(IResolveFieldContext context)
        {
            var input = context.GetArgument<WorktimeInput>("input");
            var worktime = new DataLayer.Entities.Worktime()
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(input.UserId),
                StartDate = DateTime.Parse(input.StartDate),
                FinishDate = !string.IsNullOrEmpty(input.FinishDate) ? DateTime.Parse(input.FinishDate) : (DateTime?)null,
                LastEditorId = Guid.Parse(input.LastEditorId),
                IsAutoCreated = input.IsAutoCreated,
            };

            worktimeProvider.SaveWorktime(worktime);

            return true;
        }
    }