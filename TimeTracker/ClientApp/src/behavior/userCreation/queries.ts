export const creationMutation = `
mutation($input: CreateUserInput!) {
  users {
    userCreation(input: $input)
   }
 }`;

export const getUsersQuery = `
query {
  users {
    list(
      filter: null
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
