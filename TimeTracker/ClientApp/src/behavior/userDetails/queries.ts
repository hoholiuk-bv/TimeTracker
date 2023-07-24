export const getUserQuery = `
query($id: String!) {
  users {
    user(id: $id) {
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
  }
}`;

export const getApproversQuery = `
query($id: Guid!) {
  users {
    approverList(id: $id) {
      id
      name
      surname
      email
    }
  }
}`;

export const getUpdateUserQuery = `
mutation ($input: UpdateUserInputType!){
  users {
    userUpdate(user: $input) {
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
  }
}`;
