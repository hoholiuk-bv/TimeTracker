using DataLayer.Models;
using System.Data;

namespace DataLayer.Providers
{
    public static class Queries
    {
        public static class Users
        {
            public static string GetAll(FilterModel? filter, Sorting? sort, Paging? pagination)
            {
                string filterQuery = _FilterQuery(filter);

                string sqlQuery = $@"
                    SELECT Id, Name, Surname, Email, IsAdmin, EmploymentDate, EmploymentType
                    FROM Users
                    {filterQuery}
                ";

                if (sort != null)
                {
                    sqlQuery += $" {AddSorting(sort)} ";

                    if (pagination != null)
                        sqlQuery += $" {AddPaging(pagination)} ";
                }

                return sqlQuery;
            }

            public static string GetTotalUsersCount(FilterModel? filter)
            {
                string filterQuery = _FilterQuery(filter);

                string sqlQuery = $@"
                    SELECT COUNT (*)
                    FROM Users
                    {filterQuery}
                ";

                return sqlQuery;
            }

            private static string _FilterQuery(FilterModel? filter)
            {
                if (filter == null)
                    return "";

                string filterQuery = @"
                    WHERE
                    ((Name + ' ' + Surname) LIKE '%' + @SearchText + '%' 
                    OR (Surname + ' ' + Name) LIKE '%' + @SearchText + '%'
                    OR Email LIKE '%' + @SearchText + '%')
                ";

                if (filter.StartEmploymentDate.HasValue)
                {
                    filterQuery += "AND CAST(EmploymentDate AS DATE) ";
                    if (filter.EndEmploymentDate.HasValue)
                    {
                        filterQuery += "BETWEEN @StartEmploymentDate AND @EndEmploymentDate";
                    }
                    else
                    {
                        filterQuery += "= @StartEmploymentDate";
                    }
                }

                if (filter.EmploymentTypes.Any())
                {
                    string employmentTypeFilter = string.Join(" OR ", filter.EmploymentTypes.Select(type => $"EmploymentType = {(byte)type}"));
                    filterQuery += $" AND ({employmentTypeFilter})";
                }

                return filterQuery;
            }

            public const string Save = "insert into Users values(@Id, @Name, @Surname, @Email, @Password, @Salt, @IsAdmin, @EmploymentDate, @EmploymentType)";

            public const string CheckIfExists = "select top (1) [Id] from Users";

            public const string GetByEmail = "select * from Users where Email = @Email";

            public const string GetById = "select * from Users where Id = @Id";
            
        }

        public static class DayOffRequestApprovers
        {
            public const string Create = $@"
                INSERT INTO [DayOffRequestApprovers] (UserId, ApproverId)
                VALUES (@UserId, @ApproverId)
            ";
        }

        public static class DaysOff
        {
            public const string Create = "insert into DayOffRequests values(@Id, @UserId, @StartDate, @FinishDate, @Reason)";

            public static string GetRequests(DayOffRequestFilter filter, Sorting sorting, Paging paging) =>
                $@"SELECT * FROM DayOffRequests 
                WHERE UserId='{filter.UserId}'
                {AddSorting(sorting)} 
                {AddPaging(paging)}";

            public static string GetApprovers = @"SELECT Users.Id, Users.Name, Users.Surname 
                                                  FROM DayOffRequestApprovers 
                                                  JOIN Users ON (Users.Id=DayOffRequestApprovers.ApproverId)
                                                  WHERE DayOffRequestApprovers.UserId=@UserId";

            public static string GetApprovals = @"SELECT *
                                                  FROM DayOffRequestApprovals
                                                  WHERE RequestId IN @RequestIds";
        }

        public static class Worktime
        {
            public const string SaveWorktime = "insert into WorktimeRecords values(@Id, @UserId, @StartDate, @FinishDate, @IsAutoCreated, @LastEditorId)";

            public const string GetWorktimeRecords = "select * from WorktimeRecords ORDER BY FinishDate DESC";
        }

        private static string AddSorting(Sorting sorting)
            => $@"ORDER BY {sorting.SortingField} {(sorting.SortingOrder == Constants.SortingOrder.Descending ? "DESC" : "ASC")}";

        private static string AddPaging(Paging paging)
            => $@"OFFSET ({paging.PageNumber} - 1) * {paging.PageSize} ROWS FETCH NEXT {paging.PageSize} ROWS ONLY";
    }
}
