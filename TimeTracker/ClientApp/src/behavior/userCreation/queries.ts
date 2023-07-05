export const loginMutation = `
mutation($input: LoginInput!) {
  profile { 
    login(input: $input){
      name
      surname
      token
    }
   } 
 }`;

export const registerMutation = `
mutation($input: CreateUserInput!) {
  profile { 
    userCreation(input: $input)
   } 
 }`;

