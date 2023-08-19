using BusinessLayer.Authentication;
using DataLayer.Providers;
using GraphQL;
using TimeTracker.GraphQL;
using TimeTracker.GraphQL.Profile;
using TimeTracker.GraphQL.Profile.Types;
using TimeTracker.GraphQL.Users;
using TimeTracker.GraphQL.Users.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TimeTracker.Middleware;
using BusinessLayer;
using BusinessLayer.Permissions;
using TimeTracker.GraphQL.Worktime;
using TimeTracker.GraphQL.Worktime.Types;
using TimeTracker.GraphQL.DaysOff.Types;
using TimeTracker.GraphQL.DaysOff;
using TimeTracker.GraphQL.Common.Types;
using TimeTracker.GraphQL.Approvals.Types;
using TimeTracker.GraphQL.Approvals;
using TimeTracker.GraphQL.Calendar;
using TimeTracker.GraphQL.Calendar.Types;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("*")
                   .AllowAnyHeader();
        });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.IncludeErrorDetails = true;
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = false
    };
});

builder.Services.AddAuthorization();
// Add services to the container.


builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IAuthenticationService, AuthenticationService>();
builder.Services.AddSingleton<IUserProvider, UserProvider>();
builder.Services.AddSingleton<IDaysOffProvider, DaysOffProvider>();
builder.Services.AddSingleton<IWorktimeProvider, WorktimeProvider>();
builder.Services.AddSingleton<ICalendarProvider, CalendarProvider>();
builder.Services.AddSingleton<IJwtTokenService, JwtTokenService>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<UserContext>();
builder.Services.AddSingleton<PermissionSet>();

//GraphQL

builder.Services.AddTransient<TimeTrackerMutation>();
builder.Services.AddTransient<UsersMutation>();
builder.Services.AddTransient<UsersQuery>();
builder.Services.AddTransient<TimeTrackerQuery>();
builder.Services.AddTransient<ProfileMutation>();
builder.Services.AddTransient<ProfileQuery>();
builder.Services.AddTransient<WorktimeMutation>();
builder.Services.AddTransient<UserType>();
builder.Services.AddTransient<WorktimeType>();
builder.Services.AddTransient<WorktimeQuery>();
builder.Services.AddTransient<WorktimeStatsType>();
builder.Services.AddTransient<WorktimeInputType>();
builder.Services.AddTransient<WorktimeMutation>();
builder.Services.AddTransient<FilterInputType>();
builder.Services.AddTransient<WorktimeFilterInputType>();
builder.Services.AddTransient<SortInputType>();
builder.Services.AddTransient<PaginationInputType>();
builder.Services.AddTransient<LoginInputType>();
builder.Services.AddTransient<FirstUserRegisterInputType>();
builder.Services.AddTransient<CreateUserInputType>();
builder.Services.AddTransient<UpdateUserInputType>();
builder.Services.AddTransient<AuthenticationResultType>();
builder.Services.AddTransient<UserInfoType>();
builder.Services.AddTransient<DaysOffQuery>();
builder.Services.AddTransient<ApprovalType>();
builder.Services.AddTransient<ApprovalQuery>();
builder.Services.AddTransient<ApprovalMutation>();
builder.Services.AddTransient<DayOffRequestType>();
builder.Services.AddTransient<DayOffRequestInputType>();
builder.Services.AddTransient<DayOffRequestFilterInputType>();
builder.Services.AddTransient<DaysOffMutation>();
builder.Services.AddTransient<SortingInputType>();
builder.Services.AddTransient<PagingInputType>();
builder.Services.AddTransient<DayOffRequestApprovalType>();
builder.Services.AddTransient<DayOffRequestApproverType>();
builder.Services.AddTransient<CalendarQuery>();
builder.Services.AddTransient<CalendarMutation>();
builder.Services.AddTransient<CalendarRulesQuery>();
builder.Services.AddTransient<CalendarRulesMutation>();
builder.Services.AddTransient<CalendarRuleType>();
builder.Services.AddTransient<CalendarRuleInputType>();
builder.Services.AddGraphQL(a => a.AddSchema<TimeTrackerSchema>().AddSystemTextJson().AddAuthorizationRule());

builder.Services.AddControllersWithViews();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseMiddleware<UserContextMiddleware>();
app.UseAuthorization();
app.UseGraphQL();

app.MapGet("/download/{fileName}", async (UserContext userContext, HttpContext context) =>
{
    string fileName = context.Request.RouteValues["fileName"] as string;
    string filePath = Path.Combine(Path.GetTempPath(), fileName);

    //var userContext = context.RequestServices!.GetRequiredService<UserContext>();

    if (System.IO.File.Exists(filePath))
    {
        context.Response.Headers.Add("Content-Disposition", $"attachment; filename={fileName}");
        await context.Response.SendFileAsync(filePath);
    }
    else
    {
        context.Response.StatusCode = 404;
    }
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");


app.MapFallbackToFile("index.html");
app.UseGraphQLAltair();
app.Run();
