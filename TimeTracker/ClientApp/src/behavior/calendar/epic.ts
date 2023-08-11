import { mergeMap, map, merge } from 'rxjs';
import {
  CalendarActions,
  requestCalendarRules,
  CALENDAR_RULE_CREATED,
  CALENDAR_RULES_REQUESTED,
  receiveCalendarRules,
  CALENDAR_RULE_EDITED,
  CALENDAR_RULE_DELETED
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { createCalendarRuleMutation, editCalendarRuleMutation, getCalendarRuleListQuery, deleteCalendarRuleMutation } from './queries';

const epic: Epic<CalendarActions | any> = (actions$, state$) => {

  const createCalendarRule$ = actions$.pipe(
    ofType(CALENDAR_RULE_CREATED),
    map(action => action.payload),
    mergeMap(({ input }) => sendRequest(createCalendarRuleMutation, { input }).pipe(
      map(() => requestCalendarRules(state$.value.calendar.sorting, state$.value.calendar.paging))
    ))
  );

  const editCalendarRule$ = actions$.pipe(
    ofType(CALENDAR_RULE_EDITED),
    map(action => action.payload),
    mergeMap(({ input }) => sendRequest(editCalendarRuleMutation, { input }).pipe(
      map(() => requestCalendarRules(state$.value.calendar.sorting, state$.value.calendar.paging))
    ))
  );

  const requestCalendarRules$ = actions$.pipe(
    ofType(CALENDAR_RULES_REQUESTED),
    map(action => action.payload),
    mergeMap(({ sorting }) => sendRequest(getCalendarRuleListQuery, { sorting }).pipe(
      map(({ calendar: { rules: { list } } }) => receiveCalendarRules(list))
    )),
  );

  const deleteCalendarRule$ = actions$.pipe(
    ofType(CALENDAR_RULE_DELETED),
    map(action => action.payload),
    mergeMap(({ ruleId }) => sendRequest(deleteCalendarRuleMutation, { ruleId }).pipe(
      map(() => requestCalendarRules(state$.value.calendar.sorting, state$.value.calendar.paging))
    ))
  );

  return merge(createCalendarRule$, requestCalendarRules$, editCalendarRule$, deleteCalendarRule$);
};

export default epic;
