using DataLayer.Models;
using System.Data;
using static DataLayer.Constants;

namespace DataLayer.Providers
{
    public static class Queries
    {
        public static class Users
        {
            public static string GetAll(UserFilter? filter, Sorting? sort, Paging? pagination)
            {
                string filterQuery = AddFiltering(filter);

                string sqlQuery = $@"
                    SELECT Id, Name, Surname, Email, IsAdmin, IsActive, EmploymentDate, EmploymentType, WorkingHoursCount
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

            public static string GetTotalUsersCount(UserFilter? filter)
            {
                string filterQuery = AddFiltering(filter);

                string sqlQuery = $@"
                    SELECT COUNT (*)
                    FROM Users
                    {filterQuery}
                ";

                return sqlQuery;
            }

            private static string AddFiltering(UserFilter? filter)
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

            public const string Create = @"
                INSERT INTO Users (Id, Name, Surname, Email, Password, Salt, IsAdmin, EmploymentDate, EmploymentType, WorkingHoursCount)
                VALUES (@Id, @Name, @Surname, @Email, @Password, @Salt, @IsAdmin, @EmploymentDate, @EmploymentType, @WorkingHoursCount)
            ";

            public const string Update = @"
                UPDATE Users
                SET
                    Name = @Name,
                    Surname = @Surname,
                    Email = @Email,
                    IsAdmin = @IsAdmin,
                    IsActive = @IsActive,
                    EmploymentDate = @EmploymentDate,
                    EmploymentType = @EmploymentType,
                    WorkingHoursCount = @WorkingHoursCount
                WHERE
                    Id = @Id;

                SELECT Id, Name, Surname, Email, IsAdmin, IsActive, EmploymentDate, EmploymentType, WorkingHoursCount
                FROM Users
                WHERE Id = @Id
            ";

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

            public const string DeleteApproversByUserId = @"
                DELETE DayOffRequestApprovers
                WHERE UserId = @UserId
            ";

            public const string GetApproversByUserId = $@"
                SELECT u.*
                FROM Users u
                INNER JOIN DayOffRequestApprovers d ON u.Id = d.ApproverId
                WHERE d.UserId = @UserId;
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

            public static string GetApprovers = @"SELECT Users.Id, Users.Name, Users.Surname, Users.Email
                                                  FROM DayOffRequestApprovers 
                                                  JOIN Users ON (Users.Id=DayOffRequestApprovers.ApproverId)
                                                  WHERE DayOffRequestApprovers.UserId=@UserId";

            public static string GetApprovalResults = @"SELECT *
                                                  FROM DayOffRequestApprovals
                                                  WHERE RequestId IN @RequestIds";

            public static string GetApprovals(Sorting sorting, Paging paging) => $@"SELECT  
                                                    [DayOffRequests].Id as RequestId
                                                    ,[StartDate]
                                                    ,[FinishDate]
	                                                ,[Users].Name as EmployeeName
	                                                ,[Users].Surname as EmployeeSurname
 	                                                ,DayOffRequestApprovals.Status
                                                    ,DayOffRequestApprovals.DeclineReason
                                                    FROM [TimeTracker].[dbo].[DayOffRequests]
                                                    JOIN DayOffRequestApprovers on DayOffRequestApprovers.UserId = [DayOffRequests].UserId  
                                                    JOIN Users on Users.Id = DayOffRequestApprovers.UserId 
                                                    JOIN DayOffRequestApprovals on DayOffRequestApprovals.RequestId = DayOffRequests.Id 
                                                    AND DayOffRequestApprovals.ApproverId = DayOffRequestApprovers.ApproverId
													WHERE DayOffRequestApprovers.ApproverId = @ApproverId
                                                    {AddSorting(sorting)}
                                                    {AddPaging(paging)}";

            public static string ChangeApprovalStatus = @"UPDATE DayOffRequestApprovals
                                                        SET Status = @Status, DeclineReason = @DeclineReason
                                                        WHERE RequestId = @RequestId AND ApproverId = @ApproverId";

            public static string CreateApprovals(IEnumerable<Guid> approverIds, Guid requestId) =>
                $@"INSERT INTO DayOffRequestApprovals 
                   VALUES {string.Join(',', approverIds.Select(approverId => $"('{requestId}','{approverId}', {(int)DayOffApprovalStatus.Pending}, NULL)"))}";
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
