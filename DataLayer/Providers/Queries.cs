using DataLayer.Entities;
using DataLayer.Models;
using Microsoft.AspNetCore.Http;
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
                    SELECT Id, Name, Surname, Email, IsAdmin, IsActive, EmploymentDate, EmploymentType, WorkingHoursCount, ApproverIds
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

                if (filter.ShowOnlyActiveUsers)
                {
                    filterQuery += $" AND IsActive = 1";
                }

                return filterQuery;
            }

            public const string Create = @"
                INSERT INTO Users (Id, Name, Surname, Email, Password, Salt, IsAdmin, EmploymentDate, EmploymentType, WorkingHoursCount, ApproverIds, DaysOffCount)
                VALUES (@Id, @Name, @Surname, @Email, @Password, @Salt, @IsAdmin, @EmploymentDate, @EmploymentType, @WorkingHoursCount, @ApproverIds, @DaysOffCount)
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
                    WorkingHoursCount = @WorkingHoursCount,
                    ApproverIds = @ApproverIds,
                    DaysOffCount = @DaysOffCount
                WHERE
                    Id = @Id;

                SELECT * FROM Users WHERE Id = @Id
            ";

            public const string CheckIfExists = "select top (1) [Id] from Users";

            public const string GetByEmail = "select * from Users where Email = @Email";

            public const string GetById = "select * from Users where Id = @Id";

            public const string GetDaysOffCount = "SELECT DaysOffCount FROM Users WHERE Id = @Id";

            public const string UpdateDaysOffCount = @"UPDATE Users 
                                                       SET DaysOffCount = @DaysOffCount WHERE Id = @Id;";
        }

        public static class DaysOff
        {
            public const string Create = "insert into DayOffRequests values(@Id, @UserId, @StartDate, @FinishDate, @Reason)";

            public static string GetRequests(DayOffRequestFilter filter, Sorting sorting, Paging paging) =>
                $@"SELECT * FROM DayOffRequests 
                WHERE UserId='{filter.UserId}'
                {AddSorting(sorting)} 
                {AddPaging(paging)}";

            public static string GetActiveRequests =
                $@"SELECT * FROM DayOffRequests WHERE StartDate > @StartDate";

            public static string GetRequestsCount(DayOffRequestFilter filter) => $@"
                    SELECT COUNT (*)
                    FROM DayOffRequests
                    WHERE UserId='{filter.UserId}'";

            public static string GetApproversByIdList = @"SELECT Id, Name, Surname, Email FROM Users
                                                  WHERE Id IN @ApproverIds";

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
                                                    JOIN Users on Users.Id = DayOffRequests.UserId 
                                                    JOIN DayOffRequestApprovals on DayOffRequestApprovals.RequestId = DayOffRequests.Id 
													WHERE DayOffRequestApprovals.ApproverId = @ApproverId
                                                    {AddSorting(sorting)}
                                                    {AddPaging(paging)}";

            public static string ChangeApprovalStatus = @"UPDATE DayOffRequestApprovals
                                                        SET Status = @Status, DeclineReason = @DeclineReason
                                                        WHERE RequestId = @RequestId AND ApproverId = @ApproverId";

            public static string CreateApprovals(IEnumerable<Guid> approverIds, Guid requestId) =>
                $@"INSERT INTO DayOffRequestApprovals 
                   VALUES {string.Join(',', approverIds.Select(approverId => $"('{requestId}','{approverId}', {(int)DayOffApprovalStatus.Pending}, NULL)"))}";

            public static string DeleteApprovals = @"DELETE FROM DayOffRequestApprovals WHERE RequestId = @RequestId AND ApproverId IN @ApproverIds";

            public static string DeleteDayOffRequest = @"DELETE FROM DayOffRequestApprovals WHERE RequestId = @RequestId
                                                         DELETE FROM DayOffRequests WHERE Id = @RequestId"
            ;

            public static string GetById = "SELECT * FROM DayOffRequests WHERE Id = @Id";
        }

        public static class Worktime
        {
            public const string SaveWorktime = @"
                INSERT INTO WorktimeRecords (Id, UserId, StartDate, FinishDate, LastEditorId)
                OUTPUT INSERTED.*
                VALUES (@Id, @UserId, @StartDate, @FinishDate, @LastEditorId)
            ";

            public const string UpdateWorktimeRecord = @"
                UPDATE WorktimeRecords SET
                StartDate = @StartDate,
                FinishDate = @FinishDate,
                LastEditorId = @LastEditorId
                WHERE Id = @Id

                SELECT * FROM WorktimeRecords WHERE Id = @Id
            ";

            public static string GetWorktimeRecords(Sorting? sorting, WorktimeFilter? filter, Paging? paging)
            {
                string query = @$"
                    SELECT *
                    FROM WorktimeRecords
                    {AddFiltering(filter)}
                ";

                query += sorting != null ? $" {AddSorting(sorting)}" : "";
                query += paging != null ? $" {AddPaging(paging)}" : "";

                return query;
            }

            public static string GetRecordsCount(WorktimeFilter? filter) => $@"
                SELECT COUNT(*)
                FROM WorktimeRecords
                {AddFiltering(filter)}
            ";

            private static string AddFiltering(WorktimeFilter? filter)
            {
                if (filter == null)
                    return "";

                return @$"
                    WHERE UserId = '{filter.UserId}'
                    AND YEAR(StartDate) = {filter.Year}
                    AND MONTH(StartDate) = {filter.Month}
                ";
            }
        }

        public static class CalendarRules
        {
            public static string Create = @"INSERT INTO CalendarRules VALUES (
                                            @Id, 
                                            @Title, 
                                            @Type, 
                                            @ShortDayDuration, 
                                            @StartDate, 
                                            @FinishDate, 
                                            @IsRecurring, 
                                            @RecurringFrequency, 
                                            @RecurringPeriod, 
                                            @Exceptions)";

            public static string Update = @"UPDATE CalendarRules SET 
                                            Title=@Title,
                                            Type=@Type, 
                                            ShortDayDuration=@ShortDayDuration, 
                                            StartDate=@StartDate, 
                                            FinishDate=@FinishDate, 
                                            IsRecurring=@IsRecurring, 
                                            RecurringFrequency=@RecurringFrequency, 
                                            RecurringPeriod=@RecurringPeriod, 
                                            Exceptions=@Exceptions
                                            WHERE Id=@Id";

            public static string Delete = @"DELETE FROM CalendarRules WHERE Id = @RuleId";

            public static string GetList(Sorting? sorting, Paging? paging) => @$"
                    SELECT * FROM CalendarRules
                    {(sorting != null ? AddSorting(sorting) : string.Empty)}
                    {(paging != null ? AddPaging(paging) : string.Empty)}";
        }

        private static string AddSorting(Sorting sorting)
            => $@"ORDER BY {sorting.SortingField} {(sorting.SortingOrder == Constants.SortingOrder.Descending ? "DESC" : "ASC")}";

        private static string AddPaging(Paging paging)
            => $@"OFFSET ({paging.PageNumber} - 1) * {paging.PageSize} ROWS FETCH NEXT {paging.PageSize} ROWS ONLY";
    }
}
