namespace DataLayer.Providers
{
    public static class Queries
    {
        public const string Save = "insert into Users values(@Id, @Name, @Surname, @Email, @Password, @Salt, @IsAdmin, @EmploymentDate, @EmploymentType)";

        public const string CheckIfExists = "select top (1) [Id] from Users";

        public const string GetByEmail = "select * from Users where Email = @Email";
    }
}
