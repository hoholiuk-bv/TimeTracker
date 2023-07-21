export const getUsersQuery = `
query(
  $filter: FilterInputType
  $sorting: SortInputType
  $pagination: PaginationInputType
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
      isActive
      employmentDate
      employmentType
      workingHoursCount
    }
    totalUsersCount(
      filter: $filter
    )
  }
}`;

export const getToggleActivityStatusQuery = `
mutation(
  $id: Guid!
) {
  users {
    toggleActivityStatus(id: $id)
  }
}`;
