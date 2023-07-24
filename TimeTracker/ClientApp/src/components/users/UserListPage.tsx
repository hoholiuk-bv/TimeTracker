import React, { useEffect, useState } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { requestUserList } from '../../behavior/users/actions';
import { UserPagination } from './UserPagination';
import { UserSearchPanel } from './UserSearchPanel';
import { UserTable } from './UserTable';
import { FilterType } from '../../behavior/users/types';
import {PagingInput, SortingInput, SortingOrder} from '../../behavior/common/types';

export const UserListPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state: RootState) => state.users.list);
  const totalUsersCount = useSelector((state: RootState) => state.users.totalUsersCount);

  const [filter, setFilter] = useState<FilterType>({ searchText: '', startEmploymentDate: null, endEmploymentDate: null, employmentTypes: [] });
  const [sorting, setSorting] = useState<SortingInput>({ sortingField: 'EmploymentDate', sortingOrder: SortingOrder.Ascending });
  const [pagination, setPagination] = useState<PagingInput>({ pageSize: 10, pageNumber: 1 });

  useEffect(() => {
    setPagination((prevPagination: any) => ({
      ...prevPagination,
      pageNumber: 1
    }));
  }, [filter]);

  useEffect(() => {
    dispatch(requestUserList(filter, sorting, pagination));
  }, [dispatch, filter, sorting, pagination]);

  return (
    <>
      <h1 className="mb-3">Users</h1>
      <UserSearchPanel filter={filter} setFilter={setFilter} />
      {totalUsersCount === 0 && (
        <div className="h5 alert alert-danger">User not found.</div>
      )}
      {userList.length > 0 && (
        <>
          <UserTable userList={userList} sorting={sorting} setSorting={setSorting} />
          <UserPagination totalUsersCount={totalUsersCount} pagination={pagination} setPagination={setPagination} />
        </>
      )}
    </>
  );
};
