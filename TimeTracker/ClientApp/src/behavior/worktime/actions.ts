import type { WorktimeInput} from './types';



export const USER_CREATION = 'USER_CREATION' as const;
export const userCreation = (userCreationInput: WorktimeInput) => ({
    type: USER_CREATION,
    payload: { userCreationInput }
});


export type UserCreationAction = ReturnType<typeof userCreation>;
export type CreationActions = ReturnType<
    | typeof userCreation>