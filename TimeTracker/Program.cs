using GraphQL;
using DataLayer.Providers;
using TimeTracker.GraphQL;
using TimeTracker.GraphQL.Users;
using TimeTracker.GraphQL.Users.Types;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<IUserProvider, UserProvider>();
builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("*")
                   .AllowAnyHeader();
        });
});

builder.Services.AddControllersWithViews();

builder.Services.AddTransient<UserType>();

builder.Services.AddTransient<UsersQuery>();
builder.Services.AddTransient<TimeTrackerQuery>();

//builder.Services.AddTransient<UsersMutation>();
//builder.Services.AddTransient<TimeTrackerMutation>();

builder.Services.AddGraphQL(a => a.AddSchema<TimeTrackerSchema>().AddSystemTextJson());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseStaticFiles();
app.UseRouting();
app.UseGraphQL();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
