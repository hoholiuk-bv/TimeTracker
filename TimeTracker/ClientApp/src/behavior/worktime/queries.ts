export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    workCreation(input: $input)
  } 
}`;

export const getWorktimeRecordsByUserIdQuery = `
query(
  $userId: Guid!
  $filter: WorktimeFilterInput
) {
  worktime {
    worktimeRecordsByUserId(
      userId: $userId
      filter: $filter
    ) {
      id
      userId
      startDate
      finishDate
      lastEditor
    }
  }
}`;
