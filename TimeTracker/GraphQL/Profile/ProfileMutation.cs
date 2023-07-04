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
        private readonly IHttpContextAccessor httpContextAccessor;

        public ProfileMutation(IUserProvider userProvider, IAuthenticationService authenticationService, IHttpContextAccessor httpContextAccessor)
        {
            this.userProvider = userProvider;
            this.authenticationService = authenticationService;
            this.httpContextAccessor = httpContextAccessor;

            Field<AuthenticationResultType>("Login")
                .Description("Authenticates user. Returns authentication info in case of success.")
                .Argument<NonNullGraphType<LoginInputType>>("input")
                .Resolve(ResolveLogin);

            Field<AuthenticationResultType>("FirstUserRegister")
                .Description("Registers first user into system.")
                .Argument<NonNullGraphType<FirstUserRegisterInputType>>("input")
                .Resolve(ResolveFirstUserRegister);

            Field<AuthenticationResultType>("Authenticate")
                .Description("Authenticates user.")
                .Resolve(ResolveAuthenticate);
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
                EmploymentType = Constants.EmploymentType.FullTime,
                Name = input.Name,
                Surname = input.Surname,
                Email = input.Email,
                Password = authenticationService.GenerateHash(input.Password, salt),
            };

            userProvider.Save(user);

            if (authenticationService.Authenticate(user, input.Password, out var token))
            {
                return new AuthenticationResult()
                {
                    UserInfo = new UserInfo()
                    {
                        Name = user.Name,
                        Surname = user.Surname,
                    },

                    Token = token!,
                };
            }

            return null;
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
                    UserInfo = new UserInfo()
                    {
                        Name = user.Name,
                        Surname = user.Surname,
                    },

                    Token = token!,
                };
            }

            return null;
        }

        private object? ResolveAuthenticate(IResolveFieldContext context)
        {
            var httpContext = httpContextAccessor.HttpContext;

            if (!httpContext?.User?.Identity?.IsAuthenticated ?? false)
                return null;

            return new AuthenticationResult()
            {
                UserInfo = new UserInfo()
                {
                    Name = "name",
                    Surname = "surname",
                },

                Token = httpContext!.Request.Headers["Authorization"].First()!.Split(' ')[1],
            };
        }
    }
}
