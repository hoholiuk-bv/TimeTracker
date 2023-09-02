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
  }
}`;

export const getWorktimeRecordCountQuery = `
query($filter: WorktimeFilterInput) {
  worktime {
    recordCount(filter: $filter)
  }
}`;

export const getWorktimeStatsQuery = `
query($filter: WorktimeFilterInput) {
  worktime {
    worktimeStats(filter: $filter) {
      totalWorkTimeMonthly
      plannedWorkTimeMonthly
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

export const getUrlForDownloadingUserWorktimeRecorsQuery = `
query($filter: WorktimeFilterInput) {
  worktime {
    urlForDownloadingUserWorktimeRecors(filter: $filter)
  }
}`;

export const getUrlForDownloadingWorktimeStatsQuery = `
query($filter: FilterInputType) {
  worktime {
    urlForDownloadingWorktimeStats(filter: $filter)
  }
}`;
