import { mergeMap, map, merge } from 'rxjs';
import {
  DayOffActions,
  DAYS_OFF_LIST_REQUESTED,
  DAY_OFF_REQUESTED,
  receiveDaysOffList,
  requestDaysOffList,
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { requestMutation, getDaysOffListQuery } from './queries';

const epic: Epic<DayOffActions | any> = (actions$, state$) => {

  const requestDayOff$ = actions$.pipe(
    ofType(DAY_OFF_REQUESTED),
    map(action => action.payload),
    mergeMap(({ input }) => sendRequest(requestMutation, { input }).pipe(
      map(() => requestDaysOffList(state$.value.daysOff.sorting,state$.value.daysOff.paging))
    ))
  );

  const requestDaysOffList$ = actions$.pipe(
    ofType(DAYS_OFF_LIST_REQUESTED),
    map(action => action.payload),
    mergeMap(({ sorting, paging }) => sendRequest(getDaysOffListQuery, { sorting, paging }).pipe(
      map(({ daysOff: { list } }) => receiveDaysOffList(list))
    )),
  );

  return merge(requestDayOff$, requestDaysOffList$);
};

export default epic;