﻿using BusinessLayer.Permissions;
using GraphQL.Types;

namespace TimeTracker.GraphQL.Profile.Types
{
    public class UserInfoType : ObjectGraphType<UserInfo>
    {
        public UserInfoType()
        {
            Name = "UserInfo";

            Field<NonNullGraphType<StringGraphType>>("Name");
            Field<NonNullGraphType<StringGraphType>>("Surname");
            Field<NonNullGraphType<ListGraphType<EnumerationGraphType<PermissionType>>>>("Permissions");
        }
    }

    public class UserInfo
    {
        public string Name { get; set; } = null!;

        public string Surname { get; set; } = null!;

        public IEnumerable<PermissionType> Permissions { get; set; } = null!;
    }
}