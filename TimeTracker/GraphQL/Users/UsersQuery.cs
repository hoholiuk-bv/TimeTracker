using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using DataLayer.Models;

namespace TimeTracker.GraphQL.Users
{
    public class UsersQuery : ObjectGraphType
    {
        public UsersQuery(IUserProvider userProvider)
        {
            Field<ListGraphType<UserType>>("list")
                .Description("Get list of users")
                .Argument<FilterInputType>("filter", "Filter type")
                .Argument<SortInputType>("sorting", "Sorting type")
                .Argument<PaginationInputType>("pagination", "Pagination type")
                .Resolve(context =>
                {
                    UserFilter? filter = context.GetArgument<UserFilter?>("filter");
                    Sorting? sorting = context.GetArgument<Sorting?>("sorting");
                    Paging? pagination = context.GetArgument<Paging?>("pagination");

                    return userProvider.GetAllUsers(filter, sorting, pagination).ToList();
                });

            Field<UserType>("user")
                .Description("Get user by Id")
                .Argument<StringGraphType>("id", "User ID")
                .Resolve(context =>
                {
                    string? id = context.GetArgument<string?>("id");

                    if (id == null || !Guid.TryParse(id, out _))
                        return null;

                    return userProvider.GetById(id);
                });

            Field<IntGraphType>("totalUsersCount")
                .Description("Get number of users")
                .Argument<FilterInputType>("filter", "Filter type")
                .Resolve(context =>
                {
                    UserFilter? filter = context.GetArgument<UserFilter?>("filter");
                    return userProvider.GetTotalUsersCount(filter);
                });
        }
    }
}
