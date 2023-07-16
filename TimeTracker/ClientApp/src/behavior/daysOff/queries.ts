export const requestMutation = `
mutation($input: DayOffRequestInput!) {
  daysOff { 
    requestDayOff(input: $input)
   } 
 }`;

export const getDaysOffListQuery = `
{
  daysOff {
    list {
      id
      startDate
      finishDate
      reason
      }
    }
}`;