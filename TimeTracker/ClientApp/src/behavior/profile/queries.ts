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
mutation($input: FirstUserRegisterInput!) {
  userCreation { 
    firstUserRegister(input: $input)
   } 
 }`;

export const firstUserExistenceQuery = `
{
  profile {
    checkFirstUserExistence
  }
}`;