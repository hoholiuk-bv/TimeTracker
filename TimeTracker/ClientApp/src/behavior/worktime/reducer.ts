import {Worktime} from './types';
import {createReducer} from '@reduxjs/toolkit';
import {WORKTIME_RECEIVED, WorktimeListReceivedAction} from './actions';

export type WorktimeState = {
    worktime: Worktime | null;
};

const initialState: WorktimeState = {
    worktime: null,
};

export default createReducer(initialState, {
    [WORKTIME_RECEIVED]: onWorktimeReceived,
});

function onWorktimeReceived(state: WorktimeState, action: WorktimeListReceivedAction): WorktimeState {
    const worktime = action.payload.worktime;
    return { ...state, worktime };
}

