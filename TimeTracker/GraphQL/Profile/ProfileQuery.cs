using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.WebUtilities;

namespace TimeTracker.GraphQL.Profile
{
    public class ProfileQuery : ObjectGraphType
    {
        public ProfileQuery(IUserProvider provider) 
        {
            Field<BooleanGraphType>("CheckFirstUserExistence")
                .Description("Check if first user was created")
                .AllowAnonymous()
                .Resolve(context => provider.CheckIfAnyExists());
        }
    }
}
