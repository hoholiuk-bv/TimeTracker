using DataLayer.Models;
using System.Data;

namespace DataLayer.Providers
{
    public static class Queries
    {
        public static class Users
        {
            public static string GetAll(FilterModel? filter, SortModel? sort, PaginationModel? pagination)
            {
                string filterQuery = _FilterQuery(filter);

                string sqlQuery = $@"
                    SELECT Id, Name, Surname, Email, IsAdmin, EmploymentDate, EmploymentType
                    FROM Users
                    {filterQuery}
                ";

                if(sort != null)
                {
                    sqlQuery += $@"
                        ORDER BY {sort.FieldName} {sort.SortingOrder}
                    ";

                    if(pagination != null)
                    {
                        sqlQuery += $@"
                            OFFSET ({pagination.PageNumber} - 1) * {pagination.PageSize} ROWS
                            FETCH NEXT {pagination.PageSize} ROWS ONLY
                        ";
                    }
                }

                return sqlQuery;
            }

            public static string GetTotalUsersCount (FilterModel? filter)
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
    }
}
