const authenticationSegment = 'userInfo { name surname permissions } token';

export const loginMutation = `
mutation($input: LoginInput!) {
  profile {
    login(input: $input){
      ${authenticationSegment}
    }
   }
 }`;

export const authencationMutation = `
mutation {
  profile {
    authenticate{
      ${authenticationSegment}
    }
   }
 }`;

export const registerMutation = `
mutation($input: FirstUserRegisterInput!) {
  profile {
    firstUserRegister(input: $input){
      ${authenticationSegment}
    }
   }
 }`;

export const firstUserExistenceQuery = `
{
  profile {
    checkFirstUserExistence
  }
}`;
