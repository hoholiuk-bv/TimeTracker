import { DayOffRequestInput, DayOffType } from './types';

export const DAY_OFF_REQUESTED = 'DAY_OFF_REQUESTED' as const;
export const requestDayOff = (input: DayOffRequestInput) => ({
  type: DAY_OFF_REQUESTED,
  payload: { input }
});

export const DAYS_OFF_LIST_REQUESTED = 'DAYS_OFF_LIST_REQUESTED' as const;
export const requestDaysOffList = () => ({
  type: DAYS_OFF_LIST_REQUESTED,
});

export const DAYS_OFF_LIST_RECEIVED = 'DAYS_OFF_LIST_RECEIVED' as const;
export const receiveDaysOffList = (list: DayOffType[]) => ({
  type: DAYS_OFF_LIST_RECEIVED,
  payload: { list }
});

export type DayOffRequestAction = ReturnType<typeof requestDayOff>;
export type DayOffListRequestedAction = ReturnType<typeof requestDaysOffList>;
export type DayOffListReceivedAction = ReturnType<typeof receiveDaysOffList>;

export type DayOffActions = ReturnType<
  | typeof requestDaysOffList
  | typeof receiveDaysOffList
  | typeof requestDayOff>
