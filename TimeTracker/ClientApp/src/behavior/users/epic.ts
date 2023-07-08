import {mergeMap, map, merge} from 'rxjs';
import {Epic, ofType} from 'redux-observable';
import {sendRequest} from '../graphApi';

import {
  USER_LIST_REQUESTED,
  EMPLOYMENT_TYPE_LIST_REQUESTED, 
  receiveUserList, 
  receiveEmploymentTypeList,
} from './actions';

import {getEmploymentTypeListQuery, getUsersQuery} from './queries';

const epic: Epic<any> = (actions$, state$) => {
  const requestUsers$ = actions$.pipe(
    ofType(USER_LIST_REQUESTED),
    map(action => action.payload),
    mergeMap((variables) => sendRequest(getUsersQuery, {
      searchText: variables.searchText,
      pageSize: variables.pageSize,
      pageNumber: variables.pageNumber,
      fieldName: variables.fieldName,
      sortingOrder: variables.sortingOrder,
      startEmploymentDate: variables.startEmploymentDate,
      endEmploymentDate: variables.endEmploymentDate,
      employmentType: variables.employmentType,
    }).pipe(
      map(({users}) => receiveUserList(users.list, users.totalUsersCount))
    )),
  );

  const requestEmploymentTypeList$ = actions$.pipe(
    ofType(EMPLOYMENT_TYPE_LIST_REQUESTED),
    mergeMap(() => sendRequest(getEmploymentTypeListQuery).pipe(
      map(({users}) => receiveEmploymentTypeList(users.employmentTypeList))
    )),
  );

  return merge(requestUsers$, requestEmploymentTypeList$);
};

export default epic;
