using BusinessLayer;
using DataLayer.Providers;

namespace TimeTracker.Middleware
{
    public class UserContextMiddleware
    {
        private readonly RequestDelegate next;

        public UserContextMiddleware(RequestDelegate next)
        {
            this.next = next;  
        }

        public async Task InvokeAsync(HttpContext context, IUserProvider userProvider, UserContext userContext)
        {
            var currentUser = context.User;
            var isAuthenticated = currentUser.Identity?.IsAuthenticated ?? false;
            var userId = currentUser.FindFirst("id")?.Value;

            if (!isAuthenticated || string.IsNullOrEmpty(userId))
            {
                await next(context);
                return;
            }

            userContext.User = userProvider.GetById(userId);

            await next(context);
        }
    }
}
