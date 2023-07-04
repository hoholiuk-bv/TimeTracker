import React, {useEffect, useState} from 'react';
import {RootState} from '../../behavior/store';
import {useDispatch, useSelector} from 'react-redux';
import {requestSearchedUsers, requestUserList} from '../../behavior/users/actions';
import {UserPagination} from './UserPagination';
import {UserSearchPanel} from './UserSearchPanel';
import {UserTable} from './UserTable';

export const UserListPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list);
  const totalUsersCount = useSelector((state: RootState) => state.users.totalUsersCount);
  const [searchText, setSearchText] = useState('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    dispatch(requestUserList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(requestSearchedUsers(searchText));
  }, [dispatch, searchText]);

  return (
    <>
      <div className="p-5 pt-3">
        <UserSearchPanel searchText={searchText} handleSearchInputChange={handleSearchInputChange}/>
        {searchText && users.length === 0 && (
          <div className="h5 alert alert-danger">User not found.</div>
        )}
        {users.length > 0 && (
          <UserTable users={users}/>
        )}
        <UserPagination totalUsersCount={totalUsersCount}/>
      </div>
    </>
  );
};
