using DataLayer.Providers;
﻿using DataLayer.Models;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using TimeTracker.GraphQL.Worktime.Types;
using OfficeOpenXml;
using System.Globalization;
using OfficeOpenXml.Style;
using BusinessLayer.Helpers;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeQuery : ObjectGraphType
{
    private readonly IWorktimeProvider worktimeProvider;
    private readonly IUserProvider userProvider;
    private readonly ICalendarProvider calendarProvider;
    private readonly IDaysOffProvider daysOffProvider;
    private readonly IHttpContextAccessor accessor;

    public WorktimeQuery(IWorktimeProvider worktimeProvider, IUserProvider userProvider, ICalendarProvider calendarProvider, IDaysOffProvider daysOffProvider, IHttpContextAccessor accessor)
    {
        this.worktimeProvider = worktimeProvider;
        this.userProvider = userProvider;
        this.calendarProvider = calendarProvider;
        this.daysOffProvider = daysOffProvider;
        this.accessor = accessor;

        Field<ListGraphType<WorktimeType>>("Records")
            .Description("Get list of worktime records")
            .Argument<SortInputType>("sorting")
            .Argument<WorktimeFilterInputType>("filter")
            .Argument<PaginationInputType>("paging")
            .Resolve(context =>
            {
                Sorting? sorting = context.GetArgument<Sorting?>("sorting");
                WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");
                Paging? paging = context.GetArgument<Paging?>("paging");

                return worktimeProvider.GetWorktimeRecords(sorting, filter, paging).ToList();
            });

        Field<WorktimeType>("UnfinishedWorktimeRecord")
            .Description("Get unfinished worktime records by User Id")
            .Argument<StringGraphType>("userId", "User Id")
            .Resolve(context =>
            {
                string? userId = context.GetArgument<string?>("userId");

                if (userId == null || !Guid.TryParse(userId, out _))
                {
                    return null;
                }

                return worktimeProvider.GetUnfinishedWorktimeRecordByUserId(userId);
            });

        Field<IntGraphType>("RecordCount")
            .Description("Get record count")
            .Argument<WorktimeFilterInputType>("filter")
            .Resolve(context =>
            {
                WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");
                return worktimeProvider.GetRecordCount(filter);
            });

        Field<WorktimeStatsType>("WorktimeStats")
            .Description("Get worktime statistics")
            .Argument<WorktimeFilterInputType>("filter")
            .Resolve(context =>
            {
                WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");
                return GetWorktimeStats(filter);
            });

        Field<StringGraphType>("urlForDownloadingWorktimeStats")
            .Description("Get the URL to download the worktime statistics file")
            .Argument<WorktimeFilterInputType>("filter")
            .Resolve(context => ResolveUrlForDownloadingWorktimeStats(context));
    }

    private string ResolveUrlForDownloadingWorktimeStats(IResolveFieldContext context)
    {
        WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");

        var user = userProvider.GetById(filter.UserId.ToString());
        var worktimeStats = GetWorktimeStats(filter);

        int totalWorktimeHours = (int)worktimeStats.TotalWorkTimeMonthly;
        int totalWorktimeMinutes = (int)((worktimeStats.TotalWorkTimeMonthly - totalWorktimeHours) * 100);

        int plannedWorktimeHours = (int)worktimeStats.PlannedWorkTimeMonthly;
        int plannedWorktimeMinutes = (int)((worktimeStats.PlannedWorkTimeMonthly - plannedWorktimeHours) * 100);

        using (var package = new ExcelPackage())
        {
            CultureInfo culture = CultureInfo.CurrentCulture;

            var worksheet = package.Workbook.Worksheets.Add("Worktime Stats");

            // Formatting for headers
            var headerStyle = worksheet.Cells["A1:H2"].Style;
            headerStyle.Font.Size = 14;
            headerStyle.Font.Bold = true;
            headerStyle.Fill.PatternType = ExcelFillStyle.Solid;
            headerStyle.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightBlue);
            headerStyle.Border.Top.Style = ExcelBorderStyle.Thin;
            headerStyle.Border.Bottom.Style = ExcelBorderStyle.Thin;
            headerStyle.Border.Left.Style = ExcelBorderStyle.Thin;
            headerStyle.Border.Right.Style = ExcelBorderStyle.Thin;
            headerStyle.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            headerStyle.VerticalAlignment = ExcelVerticalAlignment.Center;

            // Formatting for data
            var dataStyle = worksheet.Cells["A3:H3"].Style;
            dataStyle.Font.Size = 14;
            dataStyle.Font.Bold = false;
            dataStyle.Fill.PatternType = ExcelFillStyle.Solid;
            dataStyle.Fill.BackgroundColor.SetColor(System.Drawing.Color.White);
            dataStyle.Border.Top.Style = ExcelBorderStyle.Thin;
            dataStyle.Border.Bottom.Style = ExcelBorderStyle.Thin;
            dataStyle.Border.Left.Style = ExcelBorderStyle.Thin;
            dataStyle.Border.Right.Style = ExcelBorderStyle.Thin;
            dataStyle.HorizontalAlignment = ExcelHorizontalAlignment.Left;

            // Headers
            worksheet.Cells["A1"].Value = "Name";
            worksheet.Cells["B1"].Value = "Email";
            worksheet.Cells["C1"].Value = "Year";
            worksheet.Cells["D1"].Value = "Month";
            worksheet.Cells["E1"].Value = "Total Work Time";
            worksheet.Cells["E2"].Value = "Hours";
            worksheet.Cells["F2"].Value = "Minutes";
            worksheet.Cells["G1"].Value = "Planned Work Time";
            worksheet.Cells["G2"].Value = "Hours";
            worksheet.Cells["H2"].Value = "Minutes";

            // Data
            worksheet.Cells["A3"].Value = $"{user.Name} {user.Surname}";
            worksheet.Cells["B3"].Value = user.Email;
            worksheet.Cells["C3"].Value = filter.Year;
            worksheet.Cells["D3"].Value = culture.DateTimeFormat.GetMonthName(filter.Month);
            worksheet.Cells["E3"].Value = totalWorktimeHours;
            worksheet.Cells["F3"].Value = totalWorktimeMinutes;
            worksheet.Cells["G3"].Value = plannedWorktimeHours;
            worksheet.Cells["H3"].Value = plannedWorktimeMinutes;

            // Merging cells
            worksheet.Cells["A1:A2"].Merge = true;
            worksheet.Cells["B1:B2"].Merge = true;
            worksheet.Cells["C1:C2"].Merge = true;
            worksheet.Cells["D1:D2"].Merge = true;
            worksheet.Cells["E1:F1"].Merge = true;
            worksheet.Cells["G1:H1"].Merge = true;

            // Column width
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(6).Width = 20;
            worksheet.Column(7).Width = 20;

            // Saving the file
            var tempFilePath = Path.GetTempFileName() + ".xlsx";
            package.SaveAs(new FileInfo(tempFilePath));

            // Generating URL for the temporary .xlsx file
            var baseUrl = $"{accessor.HttpContext.Request.Scheme}://{accessor.HttpContext.Request.Host}";
            var fileUrl = $"{baseUrl}/download/{Path.GetFileName(tempFilePath)}";

            return fileUrl;
        }
    }

    private WorktimeStats GetWorktimeStats(WorktimeFilter filter)
    {
        var worktimeRecords = worktimeProvider.GetWorktimeRecords(null, filter, null).ToList();
        var user = userProvider.GetById(filter.UserId.ToString());

        TimeSpan totalWorkTime = TimeSpan.Zero;

        foreach (var worktime in worktimeRecords)
        {
            totalWorkTime += (worktime.FinishDate - worktime.StartDate) ?? TimeSpan.Zero;
        }

        var calendarRules = calendarProvider.GetCalendarRules();
        var dayOffFilter = new DayOffRequestFilter { UserId = filter.UserId };
        var userRequests = daysOffProvider.GetRequests(dayOffFilter);
        var approvals = daysOffProvider.GetApprovals(userRequests.Select(r => r.Id).ToList());

        int WorkingDaysCount = DaysOffHelper.GetWorkingDaysCount(filter.Year, filter.Month, calendarRules, userRequests, approvals);

        var worktimeStats = new WorktimeStats()
        {
            TotalWorkTimeMonthly = totalWorkTime.Days * 24 + totalWorkTime.Hours + (decimal)totalWorkTime.Minutes / 100,
            PlannedWorkTimeMonthly = user.WorkingHoursCount * WorkingDaysCount
        };

        return worktimeStats;
    }
}
