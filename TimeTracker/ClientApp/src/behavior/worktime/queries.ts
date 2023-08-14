export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    create(input: $input) {
      id
      userId
      startDate
      finishDate
      lastEditorId
    }
  } 
}`;

export const getUnfinishedWorktimeRecordQuery = `
query($userId: String!) {
  worktime {
    unfinishedWorktimeRecord(userId: $userId) {
      id
      userId
      startDate
      finishDate
      lastEditorId
    }
  }
}`;

export const updateWorktimeFinishDateMutation = `
mutation($userId: String!) {
  worktime {
    updateFinishDate(userId: $userId) {
      id
      userId
      startDate
      finishDate
      lastEditorName
    }
  }
}`;

export const updateWorktimeRecordMutation = `
mutation($input: WorkInput!) {
  worktime {
    update(input: $input) {
      id
      userId
      startDate
      finishDate
      lastEditorName
    }
  }
}`;

export const getWorktimeRecordsQuery = `
query(
  $sorting: SortInputType
  $filter: WorktimeFilterInput
  $paging: PaginationInputType
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
      lastEditorName
    }
    recordCount(filter: $filter)
    worktimeStats(filter: $filter) {
      totalWorkTimeMonthly
      plannedWorkTimeMonthly
    }
  }
}`;
