import React from 'react';
import { UserRow } from './UserRow';
import { User } from '../../behavior/users/types';
import { SortingInput } from '../../behavior/common/types';
import { SortIcon } from '../common/elements/SortIcon';
import { useDispatch } from 'react-redux';
import { changeUserListSorting } from '../../behavior/users/actions';
import { getNewSorting } from '../common/helpers';

type Props = {
  userList: User[];
  sorting: SortingInput;
};

export const UserTable = ({ userList, sorting }: Props) => {
  const dispatch = useDispatch();
  const defaultSortingField = 'EmploymentDate';

  const handleSortingColumnClick = (fieldName: string) => {
    const newSorting = getNewSorting(sorting, fieldName, defaultSortingField);
    dispatch(changeUserListSorting(newSorting));
  };

  return (
    <>
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th onClick={() => handleSortingColumnClick('Name')} className='sortableColumn'>
              <span>Name</span>
              <SortIcon sortingOrder={sorting.sortingField === 'Name' ? sorting.sortingOrder : null} />
            </th>
            <th onClick={() => handleSortingColumnClick('Email')} className='sortableColumn'>
              <span>Email</span>
              <SortIcon sortingOrder={sorting.sortingField === 'Email' ? sorting.sortingOrder : null} />
            </th>
            <th onClick={() => handleSortingColumnClick('EmploymentType')} className='sortableColumn'>
              <span>Employment type</span>
              <SortIcon sortingOrder={sorting.sortingField === 'EmploymentType' ? sorting.sortingOrder : null} />
            </th>
            <th onClick={() => handleSortingColumnClick('EmploymentDate')} className='sortableColumn' colSpan={2}>
              <span>Employment date</span>
              <SortIcon sortingOrder={sorting.sortingField === 'EmploymentDate' ? sorting.sortingOrder : null} />
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};
