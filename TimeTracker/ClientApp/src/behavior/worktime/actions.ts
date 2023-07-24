import type {WorktimeInput} from './types';


export const WORKTIME_CREATION = 'WORKTIME_CREATION' as const;
export const worktimeCreation = (worktimeCreationInput: WorktimeInput) => ({
    type: WORKTIME_CREATION,
    payload: {worktimeCreationInput}
});


export type WorktimeCreationAction = ReturnType<typeof worktimeCreation>;
export type CreationActions = ReturnType<
    | typeof worktimeCreation>