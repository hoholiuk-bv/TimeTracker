import type { PagingInput, SortingInput } from '../common/types';
import type { CalendarRule, CalendarRuleInput } from './types';

export const CALENDAR_RULE_CREATED = 'CALENDAR_RULE_CREATED' as const;
export const createCalendarRule = (input: CalendarRuleInput) => ({
  type: CALENDAR_RULE_CREATED,
  payload: { input }
});

export const CALENDAR_RULE_EDITED = 'CALENDAR_RULE_EDITED' as const;
export const editCalendarRule = (input: CalendarRuleInput) => ({
  type: CALENDAR_RULE_EDITED,
  payload: { input }
});

export const CALENDAR_RULES_REQUESTED = 'CALENDAR_RULES_REQUESTED' as const;
export const requestCalendarRules = (sorting: SortingInput, paging: PagingInput) => ({
  type: CALENDAR_RULES_REQUESTED,
  payload: { sorting, paging }
});

export const CALENDAR_RULES_RECEIVED = 'CALENDAR_RULES_RECEIVED' as const;
export const receiveCalendarRules = (rules: CalendarRule[]) => ({
  type: CALENDAR_RULES_RECEIVED,
  payload: { rules }
});

export const CALENDAR_RULES_SORTING_CHANGED = 'CALENDAR_RULES_SORTING_CHANGED' as const;
export const changeCalendarRulesSorting = (sorting: SortingInput) => ({
  type: CALENDAR_RULES_SORTING_CHANGED,
  payload: { sorting }
});


export type CalendarRuleCreatedAction = ReturnType<typeof createCalendarRule>;
export type CalendarRulesRequestedAction = ReturnType<typeof requestCalendarRules>;
export type CalendarRulesReceivedAction = ReturnType<typeof receiveCalendarRules>;
export type CalendarRulesSortingChangedAction = ReturnType<typeof changeCalendarRulesSorting>;

export type CalendarActions = ReturnType<
  | typeof createCalendarRule
  | typeof receiveCalendarRules
  | typeof requestCalendarRules
  | typeof changeCalendarRulesSorting>
