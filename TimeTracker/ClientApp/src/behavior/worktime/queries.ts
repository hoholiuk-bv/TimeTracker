export const worktimeCreationMutation = `
mutation($input: WorkInput!) {
  worktime { 
    workCreation(input: $input)
   } 
 }`;

export const getWorktimeQuery = `
query($id: String!) {
  worktime { 
    worktimeRecord(id: $id) {     
      id
      userId
      startDate
      finishDate
      isAutoCreated
      lastEditorId
        } 
    }
}`;


export const updateWorktimeMutation = `
mutation($id: String!) {
  worktime {
    worktimeUpdate(id: $id) 
  }
}`;




