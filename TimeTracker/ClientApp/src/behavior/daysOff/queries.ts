export const requestMutation = `
mutation($input: DayOffRequestInput!, $userId: ID!) {
  daysOff {
    requestDayOff(input: $input, userId: $userId)
   }
 }`;

export const getDaysOffListQuery = `
query($sorting: SortingInput!, $paging: PagingInput!, $filter: DayOffRequestFilterInput!) {
daysOff {
    list(sorting: $sorting, paging: $paging, filter: $filter) {
      id
      startDate
      finishDate
      reason
      isEditable
      approvals {
        status
        declineReason
        approver {
          name
          surname
        }
      }
    }
    requestsCount(
      filter: $filter
    )
  }
}`;

export const deleteDayOffRequestMutation = `
mutation($requestId: ID!) {
  daysOff {
    deleteDayOffRequest(requestId: $requestId)
   }
 }`;

export const getDaysOffCountQuery = `
query($userId: ID!) {
daysOff {
  daysOffCount(userId: $userId)
  }
}`;