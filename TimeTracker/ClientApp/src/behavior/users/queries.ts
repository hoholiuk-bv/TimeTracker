export const getUsersQuery = `
query(
  $filter: FilterInputType!
  $sorting: SortInputType!
  $pagination: PaginationInputType!
) {
  users {
    list(
      filter: $filter
      sorting: $sorting
      pagination: $pagination
    ) {
      id
      name
      surname
      email
      isAdmin
      employmentDate
      employmentType
    }
    totalUsersCount(
      filter: $filter
    )
  }
}`;

export const getEmploymentTypeListQuery = `
query {
  users {
    employmentTypeList
  }
}`;
