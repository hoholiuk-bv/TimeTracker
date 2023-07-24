import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { ApprovalList } from './ApprovalList';
import { useDispatch } from 'react-redux';
import { requestApprovalsList } from '../../behavior/approvals/actions';

export const ApprovalsPage = () => {
  const dispatch = useDispatch();
  const { list, sorting } = useSelector((state: RootState) => state.approvals);
  useEffect(() => { dispatch(requestApprovalsList(sorting, { pageNumber: 1, pageSize: 10 })); }, [dispatch, sorting]);

  if (!list)
    return null;

  return (
    <>
      <h1 className="mb-3">Approvals</h1>
      <ApprovalList approvals={list} sorting={sorting} />
    </>
  );
};
