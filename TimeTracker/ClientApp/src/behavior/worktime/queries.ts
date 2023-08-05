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
  $paging: PaginationInputType
) {
  worktime {
    worktimeRecordsByUserId(
      userId: $userId
      sorting: $sorting
      filter: $filter
      paging: $paging
    ) {
      id
      userId
      startDate
      finishDate
      lastEditor
    }
    recordsCount(
      userId: $userId
      filter: $filter
    )
  }
}`;
