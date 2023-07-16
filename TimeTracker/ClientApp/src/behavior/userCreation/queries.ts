export const creationMutation = `
mutation($input: CreateUserInput!) {
  users {
    userCreation(input: $input)
   }
 }`;

export const getUsersQuery = `
query(
  $filter: FilterInputType
) {
  users {
    list(
      filter: $filter
      sorting: null
      pagination: null
    ) {
      id
      name
      surname
      email
    }
  }
}`;
