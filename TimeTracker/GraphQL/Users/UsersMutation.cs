using BusinessLayer.Authentication;
using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using DataLayer;
using DataLayer.Models;
using BusinessLayer.Email;
using System.Security.Claims;
using BusinessLayer;

namespace TimeTracker.GraphQL.Users
{
    public class UsersMutation : ObjectGraphType
    {
        private readonly IUserProvider userProvider;
        private readonly IJwtTokenService jwtTokenService;
        private readonly IDaysOffProvider daysOffProvider;
        private readonly IEmailSender emailSender;
        private readonly IAuthenticationService authenticationService;

        public UsersMutation(
            IUserProvider userProvider,
            IDaysOffProvider daysOffProvider,
            IJwtTokenService jwtTokenService,
            IEmailSender emailSender,
            IAuthenticationService authenticationService)
        {
            this.userProvider = userProvider;
            this.jwtTokenService = jwtTokenService;
            this.daysOffProvider = daysOffProvider;
            this.emailSender = emailSender;
            this.authenticationService = authenticationService;

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

            Field<BooleanGraphType>("ChangePassword")
                .Description("Change user password")
                .Argument<StringGraphType>("oldPassword")
                .Argument<StringGraphType>("newPassword")
                .Resolve(context =>
                {
                    var oldPassword = context.GetArgument<string>("oldPassword");
                    var newPassword = context.GetArgument<string>("newPassword");
                    var userContext = context.RequestServices!.GetRequiredService<UserContext>();
                    var user = userProvider.GetById(userContext.User.Id.ToString());
                    var hash = authenticationService.GenerateHash(oldPassword, user.Salt);

                    if (user.Password == hash)
                    {
                        var salt = authenticationService.GenerateSalt();
                        var password = authenticationService.GenerateHash(newPassword, salt);
                        bool isPasswordChanged = userProvider.ChangePassword(user.Id, password, salt) > 0;

                        return isPasswordChanged;
                    }

                    return false;
                });
            this.authenticationService = authenticationService;
        }

        private bool ResolveUserCreation(IResolveFieldContext context)
        {
            var input = context.GetArgument<CreateUserInput>("input");
            //var salt = authenticationService.GenerateSalt();
            var user = new User()
            {
                Id = Guid.NewGuid(),
                IsAdmin = input.IsAdmin,
                EmploymentDate = DateTime.Parse(input.EmploymentDate),
                Salt = null,
                EmploymentType = input.EmploymentType,
                Name = input.Name,
                Surname = input.Surname,
                Email = input.Email,
                Password = null,
                WorkingHoursCount = input.EmploymentType == Constants.EmploymentType.FullTime ? Constants.MaxWorkingHours : input.WorkingHoursCount,
                ApproverIds = input.ApproversIdList,
                DaysOffCount = input.DaysOffCount,
                IsActive = false
            };

            userProvider.Create(user);
            SendConfirmationEmail(user);

            return true;
        }

        private void SendConfirmationEmail(User user)
        {
            var token = jwtTokenService.GenerateToken(new Claim[] { new Claim("id", user.Id.ToString())}, DateTime.UtcNow.AddDays(1));
            var message = new Message(new string[] { user.Email }, "Activate your account",
            $"Hi, {user.Name}. Click <a href=\"http://localhost:44477/createpassword?token={token}\">here</a> to complete your account activation.");

            emailSender.SendEmail(message);
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
