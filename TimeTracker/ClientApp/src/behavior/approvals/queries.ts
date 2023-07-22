export const getApprovalsListQuery = `
query($sorting: SortingInput!, $paging: PagingInput!) {
  approvals {
    list(sorting: $sorting, paging: $paging) {
      requestId
      startDate
      finishDate
      employeeName
      employeeSurname
      status
    }
  }
}`;

export const changeApprovalStatusMutation = `
mutation($requestId: ID!, $status: DayOffApprovalStatus!) {
  approvals {
    changeApprovalStatus(requestId: $requestId, status: $status)
  }
}`;