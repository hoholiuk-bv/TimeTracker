export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    workCreation(input: $input)
  } 
}`;

export const getWorktimeRecordsByUserIdQuery = `
query($userId: Guid!) {
  worktime {
    worktimeRecordsByUserId(userId: $userId) {
      id
      userId
      startDate
      finishDate
      lastEditor
    }
  }
}`;
