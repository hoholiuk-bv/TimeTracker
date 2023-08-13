import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { ApprovalList } from './ApprovalList';
import { useDispatch } from 'react-redux';
import { changeApprovalsListPaging, requestApprovalsList } from '../../behavior/approvals/actions';
import { Pagination } from '../common/elements/Pagination';

export const ApprovalsPage = () => {
  const dispatch = useDispatch();
  const { list, approvalsCount, sorting, paging } = useSelector((state: RootState) => state.approvals);
  useEffect(() => { dispatch(requestApprovalsList(sorting, paging)); }, [dispatch, sorting, paging]);

  if (!list)
    return null;

  return (
    <>
      <h1 className="mb-3">Approvals</h1>
      <ApprovalList approvals={list} sorting={sorting} />
      {approvalsCount > 0 && (
        <div className="d-flex justify-content-end">
          <Pagination paging={paging} pagingUpdateAction={changeApprovalsListPaging} itemCount={approvalsCount} />
        </div>
      )}
    </>
  );
};
