export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    workCreation(input: $input)
  } 
}`;

export const getWorktimeRecordsByUserIdQuery = `
query(
  $userId: Guid!
  $sorting: SortInputType
  $filter: WorktimeFilterInput
) {
  worktime {
    worktimeRecordsByUserId(
      userId: $userId
      sorting: $sorting
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
