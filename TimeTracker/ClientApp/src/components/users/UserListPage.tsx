import React, {useEffect, useState} from 'react';
import {RootState} from '../../behavior/store';
import {useDispatch, useSelector} from 'react-redux';
import {requestEmploymentTypeList, requestUserList} from '../../behavior/users/actions';
import {UserPagination} from './UserPagination';
import {UserSearchPanel} from './UserSearchPanel';
import {UserTable} from './UserTable';
import {FilterType, PaginationType, SortType} from '../../behavior/users/types';

export const UserListPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state: RootState) => state.users.list);
  const totalUsersCount = useSelector((state: RootState) => state.users.totalUsersCount);
  const employmentTypeList = useSelector((state: RootState) => state.users.employmentTypeList);

  const [filter, setFilter] = useState<FilterType>({ searchText: '', startEmploymentDate: null, endEmploymentDate: null, employmentTypes: [] });
  const [sorting, setSorting] = useState<SortType>({ fieldName: 'EmploymentDate', sortingOrder: 'ASC'});
  const [pagination, setPagination] = useState<PaginationType>({ pageSize: 10, pageNumber: 1});

  useEffect(() => {
    dispatch(requestUserList(filter, sorting, pagination));
  }, [dispatch, filter, sorting, pagination]);

  useEffect(() => {
    dispatch(requestEmploymentTypeList());
  }, [dispatch]);

  return (
    <div className="p-5 pt-3">
      <h2 className="mb-4 h1">Users</h2>
      <UserSearchPanel filter={filter} setFilter={setFilter} employmentTypeList={employmentTypeList}/>
      {userList.length === 0 && (
        <div className="h5 alert alert-danger">User not found.</div>
      )}
      {userList.length > 0 && (
        <UserTable userList={userList} sorting={sorting} setSorting={setSorting}/>
      )}
      <UserPagination totalUsersCount={totalUsersCount}/>
    </div>
  );
};
