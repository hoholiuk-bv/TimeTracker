using DataLayer.Providers;
﻿using DataLayer.Models;
using GraphQL;
using GraphQL.Types;
using TimeTracker.GraphQL.Users.Types;
using TimeTracker.GraphQL.Worktime.Types;
using OfficeOpenXml;
using System.Globalization;
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
        var worktimeRecords = worktimeProvider.GetWorktimeRecords(null, filter, null).ToList();

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

        using (var package = new ExcelPackage())
        {
            CultureInfo culture = CultureInfo.CurrentCulture;
            var worksheet = package.Workbook.Worksheets.Add("Worktime Stats");

            // Форматування для заголовків
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

            // Форматування для даних
            var dataStyle = worksheet.Cells["A2:G2"].Style;
            dataStyle.Font.Size = 14;
            dataStyle.Font.Bold = false;
            dataStyle.Fill.PatternType = ExcelFillStyle.Solid;
            dataStyle.Fill.BackgroundColor.SetColor(System.Drawing.Color.White);
            dataStyle.Border.Top.Style = ExcelBorderStyle.Thin;
            dataStyle.Border.Bottom.Style = ExcelBorderStyle.Thin;
            dataStyle.Border.Left.Style = ExcelBorderStyle.Thin;
            dataStyle.Border.Right.Style = ExcelBorderStyle.Thin;
            dataStyle.HorizontalAlignment = ExcelHorizontalAlignment.Left;

            // Заголовки колонок
            worksheet.Cells["A1"].Value = "Name";
            worksheet.Cells["B1"].Value = "Surname";
            worksheet.Cells["C1"].Value = "Email";
            worksheet.Cells["D1"].Value = "Year";
            worksheet.Cells["E1"].Value = "Month";
            worksheet.Cells["F1"].Value = "Total Work Time Monthly";
            worksheet.Cells["G1"].Value = "Planned Work Time Monthly";

            // Записуємо дані
            worksheet.Cells["A2"].Value = user.Name;
            worksheet.Cells["B2"].Value = user.Surname;
            worksheet.Cells["C2"].Value = user.Email;
            worksheet.Cells["D2"].Value = filter.Year;
            worksheet.Cells["E2"].Value = culture.DateTimeFormat.GetMonthName(filter.Month);
            worksheet.Cells["F2"].Value = worktimeStats.TotalWorkTimeMonthly;
            worksheet.Cells["G2"].Value = worktimeStats.PlannedWorkTimeMonthly;

            // Встановлюємо автоширину для стовпців
            worksheet.Cells.AutoFitColumns();

            // Встановлюємо формат для числових значень
            worksheet.Cells["F2:G2"].Style.Numberformat.Format = "0.00";

            // Встановлюємо висоту для рядків
            worksheet.Row(1).CustomHeight = true;
            worksheet.Row(1).Height = 30;

            // Зберігаємо файл
            var tempFilePath = Path.GetTempFileName() + ".xlsx";
            package.SaveAs(new FileInfo(tempFilePath));

            // Генерування URL до тимчасового Excel-файлу
            var baseUrl = $"{accessor.HttpContext.Request.Scheme}://{accessor.HttpContext.Request.Host}";
            var fileUrl = $"{baseUrl}/download/{Path.GetFileName(tempFilePath)}";

            return fileUrl;
        }
    }
}
