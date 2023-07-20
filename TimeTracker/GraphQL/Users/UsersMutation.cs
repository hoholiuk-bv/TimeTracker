using BusinessLayer.Authentication;
using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using DataLayer;

namespace TimeTracker.GraphQL.Users
{
    public class UsersMutation : ObjectGraphType
    {
        private readonly IUserProvider userProvider;
        private readonly IAuthenticationService authenticationService;
        private readonly IDayOffRequestApproversProvider dayOffRequestApproversProvider;

        public UsersMutation(IUserProvider userProvider, IDayOffRequestApproversProvider dayOffRequestApproversProvider, IAuthenticationService authenticationService)
        {
            this.userProvider = userProvider;
            this.authenticationService = authenticationService;
            this.dayOffRequestApproversProvider = dayOffRequestApproversProvider;

            Field<BooleanGraphType>("UserCreation")
                .Description("Create a new user")
                .Argument<NonNullGraphType<CreateUserInputType>>("input")
                .Resolve(context => ResolveUserCreation(context));
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
                WorkingHoursCount = input.EmploymentType == Constants.EmploymentType.FullTime ? Constants.MaxWorkingHours : input.WorkingHoursCount
            };

            List<Guid> approversIdentificators = input.ApproversIdList;

            bool isUserCreated = 0 < userProvider.Save(user);

            if (isUserCreated)
            {
                foreach (Guid approverId in approversIdentificators)
                    dayOffRequestApproversProvider.Create(user.Id, approverId);

                return true;
            }

            return false;
        }
    }
}
