const userFields = `
id
name
surname
email
isAdmin
isActive
employmentDate
employmentType
workingHoursCount
approvers{
  id
  name
  surname
  email
}`;

export const getUserQuery = `
query($id: String!) {
  users {
    user(id: $id) {
      ${userFields}
    }
  }
}`;



export const getUpdateUserQuery = `
mutation ($input: UpdateUserInputType!){
  users {
    userUpdate(user: $input) {
      ${userFields}
    }
  }
}`;
