import { createReducer } from '@reduxjs/toolkit';
import { SortingInput, SortingOrder } from '../common/types';
import {
  CalendarRulesAppliedAction,
  CalendarRulesReceivedAction,
  CalendarRulesSortingChangedAction,
  CALENDAR_RULES_APPLIED,
  CALENDAR_RULES_RECEIVED,
  CALENDAR_RULES_SORTING_CHANGED
} from './actions';
import { getAppliedRulesForMonth } from './helpers';
import { CalendarRule, CalendarRuleType } from './types';

export type CalendarState = {
  rules: CalendarRule[] | null;
  sorting: SortingInput;
  appliedRules: { [day: number]: AppliedRule } | null;
}

export type AppliedRule = {
  type: CalendarRuleType;
  title: string;
};

const initialState: CalendarState = {
  rules: null,
  sorting: {
    sortingField: 'StartDate',
    sortingOrder: SortingOrder.Descending,
  },
  appliedRules: null,
};

export default createReducer(initialState, {
  [CALENDAR_RULES_RECEIVED]: onCalendarRulesReceived,
  [CALENDAR_RULES_SORTING_CHANGED]: onCalendarRulesSortingChanged,
  [CALENDAR_RULES_APPLIED]: onCalendarRulesApplied,
});

function onCalendarRulesReceived(state: CalendarState, action: CalendarRulesReceivedAction) {
  const { rules } = action.payload;

  return { ...state, rules };
}

function onCalendarRulesSortingChanged(state: CalendarState, action: CalendarRulesSortingChangedAction) {
  const { sorting } = action.payload;

  return { ...state, sorting };
}

function onCalendarRulesApplied(state: CalendarState, action: CalendarRulesAppliedAction) {
  const { year, month } = action.payload;

  if (!state.rules?.length)
    return { ...state };

  return { ...state, appliedRules: getAppliedRulesForMonth(year, month, state.rules) };
}
