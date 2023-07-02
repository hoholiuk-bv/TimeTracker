using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;

namespace TimeTracker.GraphQL.Users
{
    public class UsersQuery : ObjectGraphType
    {
        public UsersQuery(IUserProvider userProvider) 
        {
            Field<ListGraphType<UserType>>("users")
                .Description("Get all users")
                .Resolve(context =>
                {
                    return userProvider.GetAllUsers().ToList();
                });

            Field<IntGraphType>("totalUsersCount")
                .Description("Get number of users")
                .Resolve(context =>
                {
                    return userProvider.GetTotalUsersCount();
                });
        }
    }
}
