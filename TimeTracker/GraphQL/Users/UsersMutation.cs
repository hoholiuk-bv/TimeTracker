using BusinessLayer.Authentication;
using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using DataLayer;
using DataLayer.Models;

namespace TimeTracker.GraphQL.Users
{
    public class UsersMutation : ObjectGraphType
    {
        private readonly IUserProvider userProvider;
        private readonly IAuthenticationService authenticationService;
        private readonly IDaysOffProvider daysOffProvider;

        public UsersMutation(IUserProvider userProvider, IDaysOffProvider daysOffProvider, IAuthenticationService authenticationService)
        {
            this.userProvider = userProvider;
            this.authenticationService = authenticationService;
            this.daysOffProvider = daysOffProvider;

            Field<BooleanGraphType>("UserCreation")
                .Description("Create a new user")
                .Argument<NonNullGraphType<CreateUserInputType>>("input")
                .Resolve(context => ResolveUserCreation(context));

            Field<UserType>("UserUpdate")
                .Description("Update user")
                .Argument<NonNullGraphType<UpdateUserInputType>>("user")
                .Resolve(context =>
                {
                    var input = context.GetArgument<UpdateUserInput>("user");

                    var user = new User()
                    {
                        Id = Guid.Parse(input.Id),
                        IsAdmin = input.IsAdmin,
                        IsActive = input.IsActive,
                        EmploymentDate = DateTime.Parse(input.EmploymentDate),
                        EmploymentType = input.EmploymentType,
                        Name = input.Name,
                        Surname = input.Surname,
                        Email = input.Email,
                        WorkingHoursCount = input.EmploymentType == Constants.EmploymentType.FullTime ? Constants.MaxWorkingHours : input.WorkingHoursCount,
                        ApproverIds = input.ApproversIdList,
                        DaysOffCount = input.DaysOffCount,
                    };

                    var updatedUser = userProvider.Update(user);
                    if (updatedUser != null)
                        UpdateDayOffApprovals(user.Id, user.ApproverIds);

                    return updatedUser;
                });
        }

        private bool ResolveUserCreation(IResolveFieldContext context)
        {
            var input = context.GetArgument<CreateUserInput>("input");
            var salt = authenticationService.GenerateSalt();
            var user = new User()
            {
                Id = Guid.NewGuid(),
                IsAdmin = input.IsAdmin,
                EmploymentDate = DateTime.Parse(input.EmploymentDate),
                Salt = salt,
                EmploymentType = input.EmploymentType,
                Name = input.Name,
                Surname = input.Surname,
                Email = input.Email,
                Password = authenticationService.GenerateHash(input.Password, salt),
                WorkingHoursCount = input.EmploymentType == Constants.EmploymentType.FullTime ? Constants.MaxWorkingHours : input.WorkingHoursCount,
                ApproverIds = input.ApproversIdList,
                DaysOffCount = input.DaysOffCount,
            };

            userProvider.Create(user);

            return true;
        }

        private void UpdateDayOffApprovals(Guid userId, List<Guid> newApproverIds)
        {
            var filter = new DayOffRequestFilter() { UserId = userId, StartDate = DateTime.Now };
            var activeRequestIds = daysOffProvider.GetActiveRequests(filter).Select(r => r.Id).ToList();
            var activeApprovals = daysOffProvider.GetApprovals(activeRequestIds).GroupBy(a => a.RequestId);

            foreach (var activeRequest in activeApprovals)
            {
                var activeApprovalIds = activeRequest.Select(a => a.ApproverId);
                var removedApproverIds = activeRequest.Where(a => !newApproverIds.Contains(a.ApproverId)).Select(a => a.ApproverId);
                var addedApproverIds = newApproverIds.Where(i => !activeApprovalIds.Contains(i));

                if (addedApproverIds.Any())
                    daysOffProvider.CreateApprovals(addedApproverIds, activeRequest.Key);

                if (removedApproverIds.Any())
                    daysOffProvider.DeleteApprovals(removedApproverIds, activeRequest.Key);
            }
        }
    }
}
