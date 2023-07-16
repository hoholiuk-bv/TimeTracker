export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    workCreation(input: $input)
   } 
 }`;

export const getWorktimeQuery = `
query {
  worktime { 
    worktimeRecords {     
      id
      userId
      startDate
      finishDate
      isAutoCreated
      lastEditorId
        } 
    }
}`;   




