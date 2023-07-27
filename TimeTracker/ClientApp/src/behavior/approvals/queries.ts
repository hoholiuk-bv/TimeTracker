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
      isEditable
      declineReason
    }
  }
}`;

export const changeApprovalStatusMutation = `
mutation($requestId: ID!, $status: DayOffApprovalStatus!, $declineReason: String) {
  approvals {
    changeApprovalStatus(requestId: $requestId, status: $status, declineReason: $declineReason)
  }
}`;
