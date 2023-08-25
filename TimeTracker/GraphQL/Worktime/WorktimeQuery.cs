﻿using DataLayer.Models;
using DataLayer.Providers;
using GraphQL;
using GraphQL.Types;
using OfficeOpenXml;
using System.Globalization;
using TimeTracker.GraphQL.Users.Types;
using TimeTracker.GraphQL.Worktime.Types;
using OfficeOpenXml.Style;

namespace TimeTracker.GraphQL.Worktime;

public class WorktimeQuery : ObjectGraphType
{
    private readonly IWorktimeProvider worktimeProvider;
    private readonly IUserProvider userProvider;
    private readonly IHttpContextAccessor accessor;

    public WorktimeQuery(IWorktimeProvider worktimeProvider, IUserProvider userProvider, IHttpContextAccessor accessor)
    {
        this.worktimeProvider = worktimeProvider;
        this.userProvider = userProvider;
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

                var lastEditor = userProvider.GetById(sortedWorktimeRecords[i].LastEditorId.ToString());

                worksheet.Cells[$"A{i + 2}"].Style.Numberformat.Format = dateFormat;
                worksheet.Cells[$"A{i + 2}"].Value = sortedWorktimeRecords[i].StartDate;

                worksheet.Cells[$"B{i + 2}"].Style.Numberformat.Format = dateFormat;
                worksheet.Cells[$"B{i + 2}"].Value = sortedWorktimeRecords[i].FinishDate;

                worksheet.Cells[$"C{i + 2}"].Style.Numberformat.Format = @"hh\:mm";
                worksheet.Cells[$"C{i + 2}"].Value = sortedWorktimeRecords[i].FinishDate.Value - sortedWorktimeRecords[i].StartDate;

                worksheet.Cells[$"D{i + 2}"].Value = $"{lastEditor.Name} {lastEditor.Surname}";
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
            var headerStyle = worksheet.Cells["A1:I2"].Style;
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
            var dataStyle = worksheet.Cells[$"A3:I{users.Count() + 2}"].Style;
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
            worksheet.Cells["I1"].Value = "Percentage of worked time";

            // Data
            for (int i = 0; i < users.Count; i++)
            {

                WorktimeFilter worktimeFilter = new WorktimeFilter {
                    UserId = users[i].Id,
                    Year = DateTime.Now.Year,
                    Month = DateTime.Now.Month,
                };

                var worktimeStats = GetWorktimeStats(worktimeFilter);

                int totalWorktimeHours = (int)worktimeStats.TotalWorkTimeMonthly;
                int totalWorktimeMinutes = (int)((worktimeStats.TotalWorkTimeMonthly - totalWorktimeHours) * 100);

                int plannedWorktimeHours = (int)worktimeStats.PlannedWorkTimeMonthly;
                int plannedWorktimeMinutes = (int)((worktimeStats.PlannedWorkTimeMonthly - plannedWorktimeHours) * 100);

                worksheet.Cells[$"A{i + 3}"].Value = $"{users[i].Name} {users[i].Surname}";
                worksheet.Cells[$"B{i + 3}"].Value = users[i].Email;
                worksheet.Cells[$"C{i + 3}"].Value = worktimeFilter.Year;
                worksheet.Cells[$"D{i + 3}"].Value = culture.DateTimeFormat.GetMonthName(worktimeFilter.Month);
                worksheet.Cells[$"E{i + 3}"].Value = totalWorktimeHours;
                worksheet.Cells[$"F{i + 3}"].Value = totalWorktimeMinutes;
                worksheet.Cells[$"G{i + 3}"].Value = plannedWorktimeHours;
                worksheet.Cells[$"H{i + 3}"].Value = plannedWorktimeMinutes;
                worksheet.Cells[$"H{i + 3}"].Value = plannedWorktimeMinutes;

                worksheet.Cells[$"I{i + 3}"].Formula = $"=((E{i + 3}*60+F{i + 3})/(G{i + 3}*60+H{i + 3}))";
                worksheet.Cells[$"I{i + 3}"].Style.Numberformat.Format = "0.00%";
            }

            // Merging cells
            worksheet.Cells["A1:A2"].Merge = true;
            worksheet.Cells["B1:B2"].Merge = true;
            worksheet.Cells["C1:C2"].Merge = true;
            worksheet.Cells["D1:D2"].Merge = true;
            worksheet.Cells["E1:F1"].Merge = true;
            worksheet.Cells["G1:H1"].Merge = true;
            worksheet.Cells["I1:I2"].Merge = true;

            // Column width
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(5).Width = 15;
            worksheet.Column(6).Width = 15;
            worksheet.Column(7).Width = 15;
            worksheet.Column(8).Width = 15;
            worksheet.Column(9).Width = 40;

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

        var worktimeStats = new WorktimeStats()
        {
            TotalWorkTimeMonthly = totalWorkTime.Days * 24 + totalWorkTime.Hours + (decimal)totalWorkTime.Minutes / 100,
            PlannedWorkTimeMonthly = user.WorkingHoursCount * 20 // [20] Temporary value
        };

        return worktimeStats;
    }
}
