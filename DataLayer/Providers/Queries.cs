using DataLayer.Models;
using System.Data;

namespace DataLayer.Providers
{
    public static class Queries
    {
        public static class Users
        {
            public static string GetAll(FilterModel filter, SortModel sort, PaginationModel pagination)
            {
                string filterQuery = _FilterQuery(filter);

                string sqlQuery = $@"
                    SELECT Id, Name, Surname, Email, IsAdmin, EmploymentDate, EmploymentType
                    FROM Users
                    WHERE
                        ((Name + ' ' + Surname) LIKE '%' + @SearchText + '%' 
                        OR (Surname + ' ' + Name) LIKE '%' + @SearchText + '%'
                        OR Email LIKE '%' + @SearchText + '%')
                        {filterQuery}

                    ORDER BY {sort.FieldName} {sort.SortingOrder}
                    OFFSET ({pagination.PageNumber} - 1) * {pagination.PageSize} ROWS
                    FETCH NEXT {pagination.PageSize} ROWS ONLY
                ";

                return sqlQuery;
            }

            public static string GetTotalUsersCount (FilterModel filter)
            {
                string filterQuery = _FilterQuery(filter);

                string sqlQuery = $@"
                    SELECT COUNT (*)
                    FROM Users
                    WHERE
                        ((Name + ' ' + Surname) LIKE '%' + @SearchText + '%' 
                        OR (Surname + ' ' + Name) LIKE '%' + @SearchText + '%'
                        OR Email LIKE '%' + @SearchText + '%')
                        {filterQuery}
                ";

                return sqlQuery;
            }

            private static string _FilterQuery(FilterModel filter)
            {
                string filterQuery = "";

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

        public static class DaysOff 
        {
            public const string Request = "insert into DayOffRequests values(@Id, @StartDate, @FinishDate, @Reason)";

            public const string GetAll = "select * from DayOffRequests";
        }

    }
}
