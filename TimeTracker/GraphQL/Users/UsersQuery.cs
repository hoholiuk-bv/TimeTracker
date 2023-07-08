using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using Microsoft.IdentityModel.Tokens;
using TimeTracker.GraphQL.Users.Types;
using System.Globalization;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Users
{
    public class UsersQuery : ObjectGraphType
    {
        public UsersQuery(IUserProvider userProvider) 
        {
            Field<ListGraphType<UserType>>("list")
                .Description("Get list of users")
                .Argument<StringGraphType>("searchText", "Text used for searching by name or email")
                .Argument<IntGraphType>("pageSize", "Number of items to display per page")
                .Argument<IntGraphType>("pageNumber", "The page number to retrieve")
                .Argument<StringGraphType>("fieldName", "Field name used for sorting")
                .Argument<StringGraphType>("sortingOrder", "Sorting order (ASC or DESC)")
                .Argument<StringGraphType>("startEmploymentDate", "Start date for filtering employment date")
                .Argument<StringGraphType>("endEmploymentDate", "End date for filtering employment date")
                .Argument<ListGraphType<StringGraphType>>("employmentType", "List of employment types to filter by")
                .Resolve(context =>
                {
                    string searchText = context.GetArgument<string?>("searchText") ?? string.Empty;
                    int pageSize = context.GetArgument<int?>("pageSize") ?? 10;
                    int pageNumber = context.GetArgument<int?>("pageNumber") ?? 1;
                    string fieldName = context.GetArgument<string?>("fieldName").IsNullOrEmpty() ? "EmploymentDate" : context.GetArgument<string>("fieldName");
                    string sortingOrder = context.GetArgument<string?>("sortingOrder") ?? "DESC";

                    string startEmploymentDateString = context.GetArgument<string>("startEmploymentDate");
                    DateTime? startEmploymentDate = !string.IsNullOrEmpty(startEmploymentDateString) ? DateTime.ParseExact(startEmploymentDateString, "dd.MM.yyyy", CultureInfo.InvariantCulture) : null;

                    string endEmploymentDateString = context.GetArgument<string>("endEmploymentDate");
                    DateTime? endEmploymentDate = !string.IsNullOrEmpty(endEmploymentDateString) ? DateTime.ParseExact(endEmploymentDateString, "dd.MM.yyyy", CultureInfo.InvariantCulture) : null;

                    List<string>? employmentTypeValues = context.GetArgument<List<string>>("employmentType");
                    List<EmploymentType> employmentTypeIds = employmentTypeValues
                        .Where(value => EmploymentTypeMappings.ContainsValue(value))
                        .Select(value => EmploymentTypeMappings.First(kvp => kvp.Value == value).Key)
                        .ToList();

                    return userProvider.GetAllUsers(searchText, pageSize, pageNumber, fieldName, sortingOrder, startEmploymentDate, endEmploymentDate, employmentTypeIds).ToList();
                });

            Field<IntGraphType>("totalUsersCount")
                .Description("Get number of users")
                .Argument<StringGraphType>("searchText", "Text used for searching by name or email")
                .Argument<StringGraphType>("startEmploymentDate", "Start date for filtering employment date")
                .Argument<StringGraphType>("endEmploymentDate", "End date for filtering employment date")
                .Argument<ListGraphType<StringGraphType>>("employmentType", "List of employment types to filter by")
                .Resolve(context =>
                {
                    string searchText = context.GetArgument<string?>("searchText") ?? string.Empty;

                    string startEmploymentDateString = context.GetArgument<string>("startEmploymentDate");
                    DateTime? startEmploymentDate = !string.IsNullOrEmpty(startEmploymentDateString) ? DateTime.ParseExact(startEmploymentDateString, "dd.MM.yyyy", CultureInfo.InvariantCulture) : null;

                    string endEmploymentDateString = context.GetArgument<string>("endEmploymentDate");
                    DateTime? endEmploymentDate = !string.IsNullOrEmpty(endEmploymentDateString) ? DateTime.ParseExact(endEmploymentDateString, "dd.MM.yyyy", CultureInfo.InvariantCulture) : null;

                    List<string>? employmentTypeValues = context.GetArgument<List<string>>("employmentType");
                    List<EmploymentType> employmentTypeIds = employmentTypeValues
                        .Where(value => EmploymentTypeMappings.ContainsValue(value))
                        .Select(value => EmploymentTypeMappings.First(kvp => kvp.Value == value).Key)
                        .ToList();

                    return userProvider.GetTotalUsersCount(searchText, startEmploymentDate, endEmploymentDate, employmentTypeIds);
                });

            Field<ListGraphType<StringGraphType>>("employmentTypeList")
                .Description("Get all employment types")
                .Resolve(context =>
                {
                    return EmploymentTypeMappings.Values.ToList();
                });
        }
    }
}
