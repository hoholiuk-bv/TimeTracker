using BusinessLayer.Authentication;
using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using TimeTracker.GraphQL.Worktime.Types;

namespace TimeTracker.GraphQL.Users
{
    public class UsersMutation : ObjectGraphType
    {
        private readonly IUserProvider userProvider;
        private readonly IAuthenticationService authenticationService;
        public UsersMutation(IUserProvider userProvider, IAuthenticationService authenticationService)
        {
            this.userProvider = userProvider;
            this.authenticationService = authenticationService;

            Field<NonNullGraphType<BooleanGraphType>>("UserCreation")
                .Description("Create a new user")
                .Argument<NonNullGraphType<CreateUserInputType>>("input")
                .Resolve(ResolveUserCreation);
            
        }
        
        private object? ResolveUserCreation(IResolveFieldContext context)
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
            };

            userProvider.Save(user);

            return true;
        }
    } 
    }

