import React, { useEffect } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserListPaging, requestUserList } from '../../behavior/users/actions';
import { UserSearchPanel } from './UserSearchPanel';
import { UserTable } from './UserTable';
import { Alert } from 'react-bootstrap';
import { Pagination } from '../common/elements/Pagination';

export const UserListPage = () => {
  const dispatch = useDispatch();
  const { list, totalUsersCount, sorting, filtering, paging } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(requestUserList(filtering, sorting, paging));
  }, [dispatch, filtering, sorting, paging]);

  if (list === null)
    return null;

  return (
    <>
      <h1 className="mb-3">Users</h1>
      <UserSearchPanel filtering={filtering} />
      {totalUsersCount === 0 && (
        <Alert variant='secondary'>User not found.</Alert>
      )}
      {list.length > 0 && (
        <>
          <UserTable userList={list} sorting={sorting} />
          <div className="d-flex justify-content-between">
            <span><strong>Total records: {totalUsersCount}</strong></span>
            <Pagination paging={paging} pagingUpdateAction={changeUserListPaging} itemCount={totalUsersCount} />
          </div>
        </>
      )}
    </>
  );
};
