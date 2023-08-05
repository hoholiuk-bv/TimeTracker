export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    workCreation(input: $input)
  } 
}`;

export const getWorktimeRecordsQuery = `
query(
  $sorting: SortInputType!
  $filter: WorktimeFilterInput
  $paging: PaginationInputType!
) {
  worktime {
    worktimeRecordsByUserId(
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
    recordsCount(filter: $filter)
    worktimeStats(filter: $filter) {
      totalWorkTimeMonthly
      plannedWorkTimeMonthly
    }
  }
}`;
