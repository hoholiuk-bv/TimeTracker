export const requestMutation = `
mutation($input: DayOffRequestInput!) {
  daysOff {
    requestDayOff(input: $input)
   }
 }`;

export const getDaysOffListQuery = `
query($sorting: SortingInput!, $paging: PagingInput!) {
daysOff {
    list(sorting: $sorting, paging: $paging) {
      id
      startDate
      finishDate
      reason
      approvals {
        status
        approver {
          name
          surname
        }
      }
    }
  }
}`;
