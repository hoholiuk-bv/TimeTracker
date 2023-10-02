using BusinessLayer.Authentication;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace TimeTracker.Controllers;

[ApiController]
[Route("oauth/github")]
public class GithubAuthController : ControllerBase
{
    private static readonly HttpClient client = new HttpClient();

    private readonly IAuthenticationService authenticationService;
    private readonly IHttpContextAccessor contextAccessor;

    public GithubAuthController(IAuthenticationService authenticationService, IHttpContextAccessor contextAccessor)
    {
        this.authenticationService = authenticationService;
        this.contextAccessor = contextAccessor;
    }

    [HttpGet("login")]
    public IActionResult ProcessCallback(string code)
    {
        var exchangeResult = ExchangeCode(code).Result.Split('&');
        var githubToken = exchangeResult.First().Split('=')[1];
        var userEmail = GetUserEmail(githubToken).Result;
        var authenticatedUser = authenticationService.Authenticate(userEmail, out var token);
        if (authenticatedUser == null)
            throw new Exception();

        contextAccessor.HttpContext.Response.Cookies.Append("auth-token", token!);
        return Redirect("/");
    }

    private async Task<string> ExchangeCode(string code)
    {
        var values = new Dictionary<string, string>
        {
            { "client_id", "Iv1.bf82c0c7c72157f8"},
            { "client_secret", "fc0c32c502aa46b8cf8a126f4f313654aa49548f" },
            { "code", code }
        };

        var content = new FormUrlEncodedContent(values);

        var response = await client.PostAsync("https://github.com/login/oauth/access_token", content);

        var responseString = await response.Content.ReadAsStringAsync();

        return responseString;
    }

    private async Task<string> GetUserEmail(string token)
    {
        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        client.DefaultRequestHeaders.UserAgent.Add(new System.Net.Http.Headers.ProductInfoHeaderValue("dttimetracker", "1.0"));
        var response = await client.GetAsync("https://api.github.com/user");

        var responseString = await response.Content.ReadAsStringAsync();

        return JObject.Parse(responseString).Value<string>("email")!;
    }
}
