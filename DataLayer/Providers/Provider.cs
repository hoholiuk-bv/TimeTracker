using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace DataLayer.Providers
{
    public abstract class Provider
    {
        private readonly IConfiguration configuration;

        public Provider(IConfiguration configuration)
           => this.configuration = configuration;

        protected List<T> Query<T>(string queryString, object? queryParams = null)
            => SendDatabaseCommand(connection => connection.Query<T>(queryString, queryParams)).ToList();

        protected int Execute(string queryString, object? queryParams = null)
            => SendDatabaseCommand(connection => connection.Execute(queryString, queryParams));

        protected T SendDatabaseCommand<T>(Func<SqlConnection, T> command)
        {
            using (var connection = new SqlConnection(configuration.GetConnectionString("Database")))
            {
                try
                {
                    return command(connection);
                }
                catch (SqlException ex)
                {
                    throw ex;
                }
            }
        }
    }
}
