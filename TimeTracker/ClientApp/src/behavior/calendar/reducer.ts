import { createReducer } from '@reduxjs/toolkit';
import { PagingInput, SortingInput, SortingOrder } from '../common/types';
import { CalendarRulesReceivedAction, CalendarRulesSortingChangedAction, CALENDAR_RULES_RECEIVED, CALENDAR_RULES_SORTING_CHANGED } from './actions';
import { CalendarRule } from './types';

export type CalendarState = {
  rules: CalendarRule[] | null,
  paging: PagingInput,
  sorting: SortingInput,
};

const initialState: CalendarState = {
  rules: null,
  paging: {
    pageNumber: 1,
    pageSize: 10,
  },
  sorting: {
    sortingField: 'StartDate',
    sortingOrder: SortingOrder.Descending,
  }
};

export default createReducer(initialState, {
  [CALENDAR_RULES_RECEIVED]: onCalendarRulesReceived,
  [CALENDAR_RULES_SORTING_CHANGED]: onCalendarRulesSortingChanged,
});

function onCalendarRulesReceived(state: CalendarState, action: CalendarRulesReceivedAction) {
  const { rules } = action.payload;

  return { ...state, rules };
}

function onCalendarRulesSortingChanged(state: CalendarState, action: CalendarRulesSortingChangedAction) {
  const { sorting } = action.payload;

  return { ...state, sorting };
}
