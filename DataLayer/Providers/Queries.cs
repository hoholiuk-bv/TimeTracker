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

            public const string Save = "insert into Users values(@Id, @Name, @Surname, @Email, @Password, @Salt, @IsAdmin, @EmploymentDate, @EmploymentType)";

            public const string CheckIfExists = "select top (1) [Id] from Users";

            public const string GetByEmail = "select * from Users where Email = @Email";
        }
    }
}
