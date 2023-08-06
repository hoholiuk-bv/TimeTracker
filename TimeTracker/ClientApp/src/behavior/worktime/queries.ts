export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    workCreation(input: $input) {
      id
      userId
      startDate
      finishDate
      lastEditor
    }
  } 
}`;

export const editWorktimeRecordMutation = `
mutation($input: WorkInput!) {
  worktime {
    worktimeUpdate(input: $input) {
      id
      userId
      startDate
      finishDate
      lastEditor
    }
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
