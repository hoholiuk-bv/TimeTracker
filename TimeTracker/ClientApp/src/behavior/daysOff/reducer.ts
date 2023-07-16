import { createReducer } from '@reduxjs/toolkit';
import { DayOffListReceivedAction, DAYS_OFF_LIST_RECEIVED } from './actions';
import { DayOffType } from './types';

export type DaysOffState = {
   list: DayOffType[],
};

const initialState: DaysOffState = {
  list: [],
};

export default createReducer(initialState, {
  [DAYS_OFF_LIST_RECEIVED]: onDaysOffReceived,
});

function onDaysOffReceived(state: DaysOffState, action: DayOffListReceivedAction) {
  const { list } = action.payload;

  return { ...state, list };
}