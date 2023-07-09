export const getUsersQuery = `
query(
  $searchText: String!
  $pageSize: Int!
  $pageNumber: Int!
  $fieldName: String!
  $sortingOrder: String!
  $startEmploymentDate: String
  $endEmploymentDate: String
  $employmentType: [String]
) {
  users {
    list(
      searchText: $searchText
      pageSize: $pageSize
      pageNumber: $pageNumber
      fieldName: $fieldName
      sortingOrder: $sortingOrder
      startEmploymentDate: $startEmploymentDate
      endEmploymentDate: $endEmploymentDate
      employmentType: $employmentType
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
      searchText: $searchText
      startEmploymentDate: $startEmploymentDate
      endEmploymentDate: $endEmploymentDate
      employmentType: $employmentType
    )
  }
}`;

export const getEmploymentTypeListQuery = `
query {
  users {
    employmentTypeList
  }
}`;
