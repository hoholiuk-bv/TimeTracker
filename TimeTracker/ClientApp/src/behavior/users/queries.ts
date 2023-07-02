export const getUsersQuery = `
{
  users {
    list {
      id
      name
      surname
      email
      isAdmin
      employmentDate
      employmentType
    }
    totalUsersCount
  }
}`;
