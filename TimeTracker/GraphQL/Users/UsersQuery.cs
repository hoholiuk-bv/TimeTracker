using DataLayer.Entities;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;

namespace TimeTracker.GraphQL.Users
{
    public class UsersQuery : ObjectGraphType
    {
        public UsersQuery(IUserProvider userProvider) 
        {
            Field<ListGraphType<UserType>>("list")
                .Description("Get list of users")
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

            Field<ListGraphType<UserType>>("searchedUsers")
                .Description("Get list of searched users")
                .Argument<StringGraphType>("searchedString", "Search users by name or email")
                .Resolve(context =>
                {
                    string searchedString = context.GetArgument<string>("searchedString");
                    return userProvider.SearchUsers(searchedString);
                });
        }
    }
}
