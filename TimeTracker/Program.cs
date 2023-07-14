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
builder.Services.AddTransient<UserType>();
builder.Services.AddTransient<FilterInputType>();
builder.Services.AddTransient<SortInputType>();
builder.Services.AddTransient<PaginationInputType>();
builder.Services.AddTransient<LoginInputType>();
builder.Services.AddTransient<FirstUserRegisterInputType>();
builder.Services.AddTransient<CreateUserInputType>();
builder.Services.AddTransient<AuthenticationResultType>();
builder.Services.AddTransient<UserInfoType>();
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

app.UseRouting();
app.UseAuthentication();
app.UseMiddleware<UserContextMiddleware>();
app.UseAuthorization();
app.UseGraphQL();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.Run();
