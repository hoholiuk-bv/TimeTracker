export const creationMutation = `
mutation($input: CreateUserInput!) {
  users { 
    userCreation(input: $input)
   } 
 }`;

