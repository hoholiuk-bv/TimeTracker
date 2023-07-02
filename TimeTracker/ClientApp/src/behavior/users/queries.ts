export const getUsersQuery = `
{
  users {
    users {
      id
      name
      surname
      email
      isAdmin
      employmentDate
      employmentType
    }
  }
}`;

export const getTotalUsersCountQuery = `
{
  users {
    totalUsersCount
  }
}`;
