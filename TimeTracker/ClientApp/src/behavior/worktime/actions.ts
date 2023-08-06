import type {WorktimeInput} from './types';
import {Worktime} from './types';


export const WORKTIME_CREATION = 'WORKTIME_CREATION' as const;
export const worktimeCreation = (worktimeCreationInput: WorktimeInput) => ({
    type: WORKTIME_CREATION,
    payload: {worktimeCreationInput}
});

export const WORKTIME_LIST_REQUESTED = 'WORKTIME_LIST_REQUESTED' as const;
export const requestWorktimeList = (id: string) => ({
    type: WORKTIME_LIST_REQUESTED,
    payload: { id },
});
export const WORKTIME_RECEIVED = 'WORKTIME_RECEIVED' as const;
export const receiveWorktime = (worktime: Worktime) => ({
    type: WORKTIME_RECEIVED,
    payload: { worktime },
});

export const WORKTIME_UPDATE = 'WORKTIME_UPDATE' as const;
export const updateWorktime = (id: string) => ({
    type: WORKTIME_UPDATE,
    payload: { id }
});


export type WorktimeCreationAction = ReturnType<typeof worktimeCreation>;
export type WorktimeListReceivedAction = ReturnType<typeof receiveWorktime>;
export type UpdateWorktimeAction = ReturnType<typeof updateWorktime>;

export type CreationActions = ReturnType<
    | typeof updateWorktime
    | typeof worktimeCreation>