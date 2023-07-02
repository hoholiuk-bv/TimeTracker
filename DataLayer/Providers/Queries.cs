namespace DataLayer.Providers
{
    public static class Queries
    {
        public static class Users
        {
            public const string GetAll = @"
                SELECT Id, Name, Surname, Email, IsAdmin, EmploymentDate, EmploymentType 
                FROM Users
            ";

            public const string GetTotalUsersCount = @"
                SELECT COUNT(*)
                FROM Users
            ";
        }
    }
}
