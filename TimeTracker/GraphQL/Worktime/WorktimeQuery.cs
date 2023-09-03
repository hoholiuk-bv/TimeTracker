using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using OfficeOpenXml;
using System.Globalization;
using TimeTracker.GraphQL.Users.Types;
using TimeTracker.GraphQL.Worktime.Types;
using OfficeOpenXml.Style;
using BusinessLayer.Helpers;
using DataLayer.Entities;

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

        Field<StringGraphType>("UrlForDownloadingUserWorktimeRecors")
            .Description("Get the URL to download the user worktime recors")
            .Argument<WorktimeFilterInputType>("filter")
            .Resolve(context => ResolveUrlForDownloadingUserWorktimeRecors(context));

        Field<StringGraphType>("UrlForDownloadingWorktimeStats")
            .Description("Get the URL to download the worktime statistics file")
            .Argument<FilterInputType>("filter")
            .Resolve(context => ResolveUrlForDownloadingWorktimeStats(context));
    }

    private string ResolveUrlForDownloadingUserWorktimeRecors(IResolveFieldContext context)
    {
        WorktimeFilter? filter = context.GetArgument<WorktimeFilter?>("filter");

        var user = userProvider.GetById(filter.UserId.ToString());
        var worktimeRecords = worktimeProvider.GetWorktimeRecords(null, filter, null).ToList();
        var sortedWorktimeRecords = worktimeRecords.OrderBy(record => record.FinishDate.Value).ToList();

        using (var package = new ExcelPackage())
        {
            CultureInfo culture = CultureInfo.CurrentCulture;

            var worksheet = package.Workbook.Worksheets.Add("Worktime Stats");

            // Formatting for headers
            var headerStyle = worksheet.Cells[$"A1:D1"].Style;
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
            var dataStyle = worksheet.Cells[$"A2:D{sortedWorktimeRecords.Count() + 1}"].Style;
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
            worksheet.Cells["A1"].Value = "Start";
            worksheet.Cells["B1"].Value = "Finish";
            worksheet.Cells["C1"].Value = "Worked time";
            worksheet.Cells["D1"].Value = "Last editor";

            // Data
            for (int i = 0; i < sortedWorktimeRecords.Count; i++)
            {
                string dateFormat = "[$-en-US]m/d/yy h:mm AM/PM;@";
                string timeFormat = @"hh\:mm";
                int rowIndex = i + 2;

                worksheet.Cells[$"A{rowIndex}"].Style.Numberformat.Format = dateFormat;
                worksheet.Cells[$"A{rowIndex}"].Value = sortedWorktimeRecords[i].StartDate;

                worksheet.Cells[$"B{rowIndex}"].Style.Numberformat.Format = dateFormat;
                worksheet.Cells[$"B{rowIndex}"].Value = sortedWorktimeRecords[i].FinishDate;

                worksheet.Cells[$"C{rowIndex}"].Style.Numberformat.Format = timeFormat;
                worksheet.Cells[$"C{rowIndex}"].Value = sortedWorktimeRecords[i].FinishDate.Value - sortedWorktimeRecords[i].StartDate;

                bool hasLastEditor = sortedWorktimeRecords[i].LastEditorId != null;
                User? lastEditor = hasLastEditor ? userProvider.GetById(sortedWorktimeRecords[i].LastEditorId.ToString()) : null;
                worksheet.Cells[$"D{rowIndex}"].Value = hasLastEditor ? $"{lastEditor.Name} {lastEditor.Surname}" : "System";
            }

            // Column width
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width += 5;
            worksheet.Column(2).Width += 5;
            worksheet.Column(3).Width += 5;
            worksheet.Column(4).Width += 5;

            // Saving the file
            var tempFileName = $"{Path.GetFileNameWithoutExtension(Path.GetTempFileName())}-{user.Name}-{user.Surname}.xlsx";
            var tempFilePath = Path.Combine(Path.GetTempPath(), tempFileName);
            package.SaveAs(new FileInfo(tempFilePath));

            // Generating URL for the temporary .xlsx file
            var baseUrl = $"{accessor.HttpContext.Request.Scheme}://{accessor.HttpContext.Request.Host}";
            var fileUrl = $"{baseUrl}/download/{Path.GetFileName(tempFilePath)}";

            return fileUrl;
        }
    }

    private string ResolveUrlForDownloadingWorktimeStats(IResolveFieldContext context)
    {
        UserFilter filter = context.GetArgument<UserFilter>("filter");

        var users = userProvider.GetAllUsers(filter, null, null).ToList();

        using (var package = new ExcelPackage())
        {
            CultureInfo culture = CultureInfo.CurrentCulture;

            var worksheet = package.Workbook.Worksheets.Add("Worktime Stats");

            // Formatting for headers
            var headerStyle = worksheet.Cells["A1:G1"].Style;
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
            var dataStyle = worksheet.Cells[$"A2:G{users.Count() + 1}"].Style;
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
            worksheet.Cells["E1"].Value = "Actual Work Time";
            worksheet.Cells["F1"].Value = "Planned Work Time";
            worksheet.Cells["G1"].Value = "Percentage of Worked Time";

            // Data
            for (int i = 0; i < users.Count; i++)
            {
                WorktimeFilter worktimeFilter = new WorktimeFilter {
                    UserId = users[i].Id,
                    Year = DateTime.Now.Year,
                    Month = DateTime.Now.Month,
                };

                int rowIndex = i + 2;
                var worktimeStats = GetWorktimeStats(worktimeFilter);

                worksheet.Cells[$"A{rowIndex}"].Value = $"{users[i].Name} {users[i].Surname}";
                worksheet.Cells[$"B{rowIndex}"].Value = users[i].Email;
                worksheet.Cells[$"C{rowIndex}"].Value = worktimeFilter.Year;
                worksheet.Cells[$"D{rowIndex}"].Value = culture.DateTimeFormat.GetMonthName(worktimeFilter.Month);
                worksheet.Cells[$"E{rowIndex}"].Value = CalculateDecimalTime(worktimeStats.TotalWorkTimeMonthly);
                worksheet.Cells[$"F{rowIndex}"].Value = CalculateDecimalTime(worktimeStats.PlannedWorkTimeMonthly);
                worksheet.Cells[$"G{rowIndex}"].Formula = $"=E{rowIndex}/F{rowIndex}";
                worksheet.Cells[$"G{rowIndex}"].Style.Numberformat.Format = "0.00%";
            }

            // Column width
            worksheet.Cells.AutoFitColumns();

            // Saving the file
            var tempFileName = $"{Path.GetFileNameWithoutExtension(Path.GetTempFileName())}-WorktimeStats.xlsx";
            var tempFilePath = Path.Combine(Path.GetTempPath(), tempFileName);
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
        decimal plannedWorktime = WorktimeHelper.GetPlannedWorktime(filter.Year, filter.Month, calendarRules, user.WorkingHoursCount, WorkingDaysCount);

        var worktimeStats = new WorktimeStats()
        {
            TotalWorkTimeMonthly = totalWorkTime.Days * 24 + totalWorkTime.Hours + (decimal)totalWorkTime.Minutes / 100,
            PlannedWorkTimeMonthly = plannedWorktime
        };

        return worktimeStats;
    }

    private double CalculateDecimalTime(decimal time)
    {
        int hours = (int)time;
        int minutes = (int)((time - hours) * 100);
        return Math.Round(hours + minutes / 60.0, 2);
    }
}
