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

export const getSearchedUsersQuery = `
query($searchedString: String!) {
  users {
    searchedUsers(searchedString: $searchedString) {
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
