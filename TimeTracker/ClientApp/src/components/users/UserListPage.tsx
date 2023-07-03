import React, {useEffect} from 'react';
import {RootState} from '../../behavior/store';
import {useDispatch, useSelector} from 'react-redux';
import {requestUserList} from '../../behavior/users/actions';
import {UserPagination} from './UserPagination';
import {UserSearchPanel} from './UserSearchPanel';
import {UserTable} from './UserTable';

export const UserListPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list);
  const totalUsersCount = useSelector((state: RootState) => state.users.totalUsersCount);

  useEffect(() => {
    dispatch(requestUserList());
  }, [dispatch]);

  return (
    <>
      <div className="p-5 pt-3">
        <UserSearchPanel/>
        <UserTable users={users}/>
        <UserPagination totalUsersCount={totalUsersCount}/>
      </div>
    </>
  );
};
