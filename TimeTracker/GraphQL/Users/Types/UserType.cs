using DataLayer.Entities;
using GraphQL.Types;
using static DataLayer.Constants;

namespace TimeTracker.GraphQL.Users.Types
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Surname);
            Field(t => t.Email);
            Field(t => t.IsAdmin);

            Field<StringGraphType>()
                .Name("EmploymentDate")
                .Resolve(context =>
                {
                    DateTime employmentDate = context.Source.EmploymentDate;
                    return employmentDate.ToString("dd.MM.yyyy");
                });

            Field<StringGraphType>()
                .Name("EmploymentType")
                .Resolve(context =>
                {
                    EmploymentType employmentType = context.Source.EmploymentType;

                    if (EmploymentTypeMappings.ContainsKey(employmentType))
                        return EmploymentTypeMappings[employmentType];

                    return employmentType.ToString();
                });
        }
    }
}
