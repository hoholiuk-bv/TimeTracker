import React, { useEffect, useState } from 'react';
import { RootState } from '../../behavior/store';
import { useDispatch, useSelector } from 'react-redux';
import { requestEmploymentTypeList, requestUserList } from '../../behavior/users/actions';
import { UserPagination } from './UserPagination';
import { UserSearchPanel } from './UserSearchPanel';
import { UserTable } from './UserTable';

export const UserListPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list);
  const totalUsersCount = useSelector((state: RootState) => state.users.totalUsersCount);
  const employmentTypeList = useSelector((state: RootState) => state.users.employmentTypeList);
  const [fieldName, setFieldName] = useState('');
  const [sortingOrder, setSortingOrder] = useState('');
  const [searchText, setSearchText] = useState('');
  const [startEmploymentDate, setStartEmploymentDate] = useState('');
  const [endEmploymentDate, setEndEmploymentDate] = useState('');
  const [employmentType, setEmploymentType] = useState([]);

  useEffect(() => {
    dispatch(requestUserList(searchText, 10, 1, fieldName, sortingOrder, startEmploymentDate, endEmploymentDate, employmentType));
  }, [dispatch, searchText, fieldName, sortingOrder, startEmploymentDate, endEmploymentDate, employmentType]);

  useEffect(() => {
    dispatch(requestEmploymentTypeList());
  }, [dispatch]);

  return (
    <>
      <h1 className="mb-3">Users</h1>
      <UserSearchPanel
        searchText={searchText}
        setSearchText={setSearchText}
        setStartEmploymentDate={setStartEmploymentDate}
        startEmploymentDate={startEmploymentDate}
        setEndEmploymentDate={setEndEmploymentDate}
        endEmploymentDate={endEmploymentDate}
        employmentTypeList={employmentTypeList}
        setEmploymentType={setEmploymentType}
        employmentType={employmentType}
      />
      {users.length === 0 && (
        <div className="h5 alert alert-danger">User not found.</div>
      )}
      {users.length > 0 && (
        <UserTable
          users={users}
          fieldName={fieldName}
          setFieldName={setFieldName}
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
        />
      )}
      <UserPagination totalUsersCount={totalUsersCount} />
    </>
  );
};
