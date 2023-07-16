using System.Data;
using static DataLayer.Constants;

namespace DataLayer.Providers
{
    public static class Queries
    {
        public static class Users
        {
            public static string GetAll(
                IEnumerable<EmploymentType> employmentTypes,
                int pageSize = 10,
                int pageNumber = 1,
                string fieldName = "EmploymentDate",
                string sortingOrder = "DESC",
                DateTime? startEmploymentDate = null,
                DateTime? endEmploymentDate = null)
            {
                string filterQuery = _FilterQuery(employmentTypes, startEmploymentDate, endEmploymentDate);

                string sqlQuery = $@"
                    SELECT Id, Name, Surname, Email, IsAdmin, EmploymentDate, EmploymentType
                    FROM Users
                    WHERE
                        ((Name + ' ' + Surname) LIKE '%' + @SearchText + '%' 
                        OR (Surname + ' ' + Name) LIKE '%' + @SearchText + '%'
                        OR Email LIKE '%' + @SearchText + '%')
                        {filterQuery}

                    ORDER BY {fieldName} {sortingOrder}
                    OFFSET ({pageNumber} - 1) * {pageSize} ROWS
                    FETCH NEXT {pageSize} ROWS ONLY
                ";

                return sqlQuery;
            }

            public static string GetTotalUsersCount (
                IEnumerable<EmploymentType> employmentTypes,
                DateTime? startEmploymentDate = null,
                DateTime? endEmploymentDate = null)
            {
                string filterQuery = _FilterQuery(employmentTypes, startEmploymentDate, endEmploymentDate);

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

            private static string _FilterQuery(
                IEnumerable<EmploymentType> employmentTypes,
                DateTime? startEmploymentDate = null,
                DateTime? endEmploymentDate = null)
            {
                string filterQuery = "";

                if (startEmploymentDate.HasValue)
                {
                    filterQuery += "AND CAST(EmploymentDate AS DATE) ";
                    if (endEmploymentDate.HasValue)
                    {
                        filterQuery += "BETWEEN @StartEmploymentDate AND @EndEmploymentDate";
                    }
                    else
                    {
                        filterQuery += "= @StartEmploymentDate";
                    }
                }

                if (employmentTypes.Any())
                {
                    string employmentTypeFilter = string.Join(" OR ", employmentTypes.Select(type => $"EmploymentType = {(byte)type}"));
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
