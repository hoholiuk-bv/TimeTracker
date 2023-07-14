import React from 'react';
import {UserRow} from './UserRow';
import {SortType, User} from '../../behavior/users/types';
import {SortIcon} from './SortIcon';

type Props = {
    userList: User[];
    sorting: SortType;
    setSorting: any;
};

export const UserTable = ({userList, sorting, setSorting}: Props) => {

  const handleSortingClick = (field: string) => {
    if (field === sorting.fieldName) {
      setSorting((prevSorting: any ) => ({
        ...prevSorting,
        sortingOrder: sorting.sortingOrder === 'DESC' ? '' : sorting.sortingOrder === 'ASC' ? 'DESC' : 'ASC'
      }));
    } else {
      setSorting({
        fieldName: field,
        sortingOrder: 'ASC'
      });
    }
  };

  const getSortingType = (): string => {
    switch (sorting.sortingOrder) {
    case 'DESC':
      return 'descending';
    case 'ASC':
      return 'ascending';
    default:
      return '';
    }
  };

  return (
    <table className="table table-striped mb-4">
      <thead>
        <tr>
          <th onClick={() => handleSortingClick('Name')} className={sorting.fieldName === 'Name' ? getSortingType() : ''}>
            <span>Name</span>
            <SortIcon sortingType={sorting.fieldName === 'Name' ? getSortingType() : ''}/>
          </th>
          <th onClick={() => handleSortingClick('Email')} className={sorting.fieldName === 'Email' ? getSortingType() : ''}>
            <span>Email</span>
            <SortIcon sortingType={sorting.fieldName === 'Email' ? getSortingType() : ''}/>
          </th>
          <th onClick={() => handleSortingClick('EmploymentType')} className={sorting.fieldName === 'EmploymentType' ? getSortingType() : ''}>
            <span>Employment type</span>
            <SortIcon sortingType={sorting.fieldName === 'EmploymentType' ? getSortingType() : ''}/>
          </th>
          <th onClick={() => handleSortingClick('EmploymentDate')} className={sorting.fieldName === 'EmploymentDate' ? getSortingType() : ''} colSpan={2}>
            <span>Employment date</span>
            <SortIcon sortingType={sorting.fieldName === 'EmploymentDate' ? getSortingType() : ''}/>
          </th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <UserRow key={user.id} user={user}/>
        ))}
      </tbody>
    </table>
  );
};
