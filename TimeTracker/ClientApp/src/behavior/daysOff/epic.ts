import { mergeMap, map, merge } from 'rxjs';
import {
  DayOffActions,
  DAYS_OFF_LIST_REQUESTED,
  DAY_OFF_REQUESTED,
  DAY_OFF_REQUEST_DELETED,
  receiveDaysOffList,
  requestDaysOffList,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { requestMutation, getDaysOffListQuery, deleteDayOffRequest } from './queries';

const epic: Epic<DayOffActions | any> = (actions$, state$) => {

  const requestDayOff$ = actions$.pipe(
    ofType(DAY_OFF_REQUESTED),
    map(action => action.payload),
    mergeMap(({ input }) => sendRequest(requestMutation, { input }).pipe(
      map(() => requestDaysOffList(state$.value.daysOff.sorting, state$.value.daysOff.paging, state$.value.daysOff.filter))
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
    mergeMap(({ requestId }) => sendRequest(deleteDayOffRequest, { requestId }).pipe(
      map(() => requestDaysOffList(state$.value.daysOff.sorting, state$.value.daysOff.paging, state$.value.daysOff.filter))
    ))
  );

  return merge(requestDayOff$, requestDaysOffList$, deleteDayOffRequest$);
};

export default epic;