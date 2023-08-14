import { mergeMap, map, merge, switchMap } from 'rxjs';
import {
  DayOffActions,
  DAYS_OFF_COUNT_REQUESTED,
  DAYS_OFF_LIST_REQUESTED,
  DAY_OFF_REQUESTED,
  DAY_OFF_REQUEST_DELETED,
  receiveDaysOffCount,
  receiveDaysOffList,
  requestDaysOffCount,
  requestDaysOffList,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { requestMutation, getDaysOffListQuery, deleteDayOffRequestMutation, getDaysOffCountQuery } from './queries';

const epic: Epic<DayOffActions | any> = (actions$, state$) => {

  const requestDayOff$ = actions$.pipe(
    ofType(DAY_OFF_REQUESTED),
    map(action => action.payload),
    switchMap(({ input }) => sendRequest(requestMutation, { input }).pipe(
      mergeMap(() => [
        requestDaysOffList(state$.value.daysOff.sorting, state$.value.daysOff.paging, state$.value.daysOff.filter),
        requestDaysOffCount(state$.value.profile.userInfo.id)
      ]),
    ))
  );

  const requestDaysOffList$ = actions$.pipe(
    ofType(DAYS_OFF_LIST_REQUESTED),
    map(action => action.payload),
    mergeMap(({ sorting, paging, filter }) => sendRequest(getDaysOffListQuery, { sorting, paging, filter }).pipe(
      map(({ daysOff: { list, requestsCount } }) => receiveDaysOffList(list, requestsCount))
    )),
  );

  const deleteDayOffRequest$ = actions$.pipe(
    ofType(DAY_OFF_REQUEST_DELETED),
    map(action => action.payload),
    switchMap(({ requestId }) => sendRequest(deleteDayOffRequestMutation, { requestId }).pipe(
      mergeMap(() => [
        requestDaysOffList(state$.value.daysOff.sorting, state$.value.daysOff.paging, state$.value.daysOff.filter),
        requestDaysOffCount(state$.value.profile.userInfo.id)
      ]),
    ))
  );

  const requestDaysOffCount$ = actions$.pipe(
    ofType(DAYS_OFF_COUNT_REQUESTED),
    map(action => action.payload),
    mergeMap(({ userId }) => sendRequest(getDaysOffCountQuery, { userId }).pipe(
      map(({ daysOff: { daysOffCount } }) => receiveDaysOffCount(daysOffCount))
    )),
  );


  return merge(requestDayOff$, requestDaysOffList$, deleteDayOffRequest$, requestDaysOffCount$);
};

export default epic;
