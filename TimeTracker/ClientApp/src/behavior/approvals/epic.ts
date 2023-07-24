import { mergeMap, merge, map } from 'rxjs';
import {
  ApprovalsActions,
  APPROVALS_LIST_REQUESTED,
  CHANGE_APPROVAL_STATUS,
  receiveApprovalsList,
  requestApprovalsList
} from './actions';
import { Epic, ofType } from 'redux-observable';
import { sendRequest } from '../graphApi';
import { getApprovalsListQuery, changeApprovalStatusMutation } from './queries';

const epic: Epic<ApprovalsActions | any> = (actions$, state$) => {

  const requestApprovalsList$ = actions$.pipe(
    ofType(APPROVALS_LIST_REQUESTED),
    map(action => action.payload),
    mergeMap(({ sorting, paging }) => sendRequest(getApprovalsListQuery, { sorting, paging }).pipe(
      map(({ approvals: { list } }) => receiveApprovalsList(list))
    )),
  );

  const toggleApprovalStatus$ = actions$.pipe(
    ofType(CHANGE_APPROVAL_STATUS),
    map(action => action.payload),
    mergeMap(({ requestId, status }) => sendRequest(changeApprovalStatusMutation, { requestId, status }).pipe(
      map(() => requestApprovalsList(state$.value.approvals.sorting, state$.value.approvals.paging))
    )),
  );

  return merge(requestApprovalsList$, toggleApprovalStatus$);
};

export default epic;