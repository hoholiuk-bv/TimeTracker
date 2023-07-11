using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using static DataLayer.Constants;
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
                    FilterModel filter = context.GetArgument<FilterModel>("filter");
                    SortModel sorting = context.GetArgument<SortModel>("sorting");
                    PaginationModel pagination = context.GetArgument<PaginationModel>("pagination");

                    return userProvider.GetAllUsers(filter, sorting, pagination).ToList();
                });

            Field<IntGraphType>("totalUsersCount")
                .Description("Get number of users")
                .Argument<FilterInputType>("filter", "Filter type")
                .Resolve(context =>
                {
                    FilterModel filter = context.GetArgument<FilterModel>("filter");
                    return userProvider.GetTotalUsersCount(filter);
                });

            Field<ListGraphType<StringGraphType>>("employmentTypeList")
                .Description("Get all employment types")
                .Resolve(context =>
                {
                    return Enum.GetNames(typeof(EmploymentType)).ToList();
                });
        }
    }
}
