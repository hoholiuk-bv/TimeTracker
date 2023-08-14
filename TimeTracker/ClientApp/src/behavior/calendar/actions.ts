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
export const requestCalendarRules = (sorting?: SortingInput, paging?: PagingInput) => ({
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

export const CALENDAR_RULES_APPLIED = 'CALENDAR_RULES_APPLIED' as const;
export const applyCalendarRules = (year: number, month: number) => ({
  type: CALENDAR_RULES_APPLIED,
  payload: { year, month }
});

export const CALENDAR_RULE_DELETED = 'CALENDAR_RULE_DELETED' as const;
export const deleteCalendarRule = (ruleId: string) => ({
  type: CALENDAR_RULE_DELETED,
  payload: { ruleId }
});

export type CalendarRuleCreatedAction = ReturnType<typeof createCalendarRule>;
export type CalendarRulesRequestedAction = ReturnType<typeof requestCalendarRules>;
export type CalendarRulesReceivedAction = ReturnType<typeof receiveCalendarRules>;
export type CalendarRulesSortingChangedAction = ReturnType<typeof changeCalendarRulesSorting>;
export type CalendarRulesAppliedAction = ReturnType<typeof applyCalendarRules>;
export type CalendarRulesDeletedAction = ReturnType<typeof deleteCalendarRule>;

export type CalendarActions = ReturnType<
  | typeof createCalendarRule
  | typeof receiveCalendarRules
  | typeof requestCalendarRules
  | typeof applyCalendarRules
  | typeof changeCalendarRulesSorting
  | typeof deleteCalendarRule>
