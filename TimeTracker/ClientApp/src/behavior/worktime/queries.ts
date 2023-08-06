export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    create(input: $input) {
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
    update(input: $input) {
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
    records(
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
