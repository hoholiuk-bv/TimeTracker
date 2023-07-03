using BusinessLayer.Authentication;
using DataLayer;
using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Profile.Types;

namespace TimeTracker.GraphQL.Profile
{
    public class ProfileMutation : ObjectGraphType
    {
        private readonly IUserProvider userProvider;
        private readonly IAuthenticationService authenticationService;

        public ProfileMutation(IUserProvider userProvider, IAuthenticationService authenticationService)
        {
            this.userProvider = userProvider;
            this.authenticationService = authenticationService;

            Field<AuthenticationResultType>("Login")
                .Description("Authenticates user. Returns authentication info in case of success.")
                .Argument<NonNullGraphType<LoginInputType>>("input")
                .Resolve(ResolveLogin);

            Field<NonNullGraphType<BooleanGraphType>>("FirstUserRegister")
                .Description("Registers first user into system.")
                .Argument<NonNullGraphType<FirstUserRegisterInputType>>("input")
                .Resolve(ResolveFirstUserRegister);
        }

        private object? ResolveFirstUserRegister(IResolveFieldContext context)
        {
            var input = context.GetArgument<FirstUserRegisterInput>("input");
            var salt = authenticationService.GenerateSalt();
            var user = new User()
            {
                Id = Guid.NewGuid(),
                IsAdmin = true,
                EmploymentDate = DateTime.Now,
                Salt = salt,
                EmploymentType = EmploymentType.FullTime,
                Name = input.Name,
                Surname = input.Surname,
                Email = input.Email,
                Password = authenticationService.GenerateHash(input.Password, salt),
            };

            userProvider.Save(user);

            return true;
        }

        private object? ResolveLogin(IResolveFieldContext context)
        {
            var input = context.GetArgument<LoginInput>("input");
            var user = userProvider.GetByEmail(input.Email);
            if (user == null)
                return null;

            if (authenticationService.Authenticate(user, input.Password, out var token))
            {
                return new AuthenticationResult()
                {
                    Name = user.Name,
                    Surname = user.Surname,
                    Token = token!,
                };
            }

            return null;
        }
    }
}
