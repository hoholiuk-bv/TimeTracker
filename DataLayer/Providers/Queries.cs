namespace DataLayer.Providers
{
    public static class Queries
    {
        public const string GetAllQuery = @"
                SELECT Id, Name, Surname, Email, IsAdmin, EmploymentDate, EmploymentType 
                FROM Users
            ";

        public const string GetTotalUsersCountQuery = @"
                SELECT COUNT(*)
                FROM Users
            ";
    }
}
