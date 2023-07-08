import React from 'react';
import {UserRow} from './UserRow';
import {User} from '../../behavior/users/types';
import {SortIcon} from './SortIcon';

type Props = {
    users: User[];
    fieldName: any;
    setFieldName: any;
    sortingOrder: any;
    setSortingOrder: any;
};

export const UserTable = ({users, fieldName, setFieldName, sortingOrder, setSortingOrder}: Props) => {

  const handleSortingClick = (field: string) => {
    if (field === fieldName) {
      setSortingOrder(sortingOrder === 'DESC' ? '' : sortingOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setFieldName(field);
      setSortingOrder('ASC');
    }
  };

  const getSortingType = (): string => {
    switch (sortingOrder) {
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
          <th onClick={() => handleSortingClick('Name')} className={fieldName === 'Name' ? getSortingType() : ''}>
            <span>Name</span>
            <SortIcon sortingType={fieldName === 'Name' ? getSortingType() : ''}/>
          </th>
          <th onClick={() => handleSortingClick('Email')} className={fieldName === 'Email' ? getSortingType() : ''}>
            <span>Email</span>
            <SortIcon sortingType={fieldName === 'Email' ? getSortingType() : ''}/>
          </th>
          <th onClick={() => handleSortingClick('EmploymentType')} className={fieldName === 'EmploymentType' ? getSortingType() : ''}>
            <span>Employment type</span>
            <SortIcon sortingType={fieldName === 'EmploymentType' ? getSortingType() : ''}/>
          </th>
          <th onClick={() => handleSortingClick('EmploymentDate')} className={fieldName === 'EmploymentDate' ? getSortingType() : ''} colSpan={2}>
            <span>Employment date</span>
            <SortIcon sortingType={fieldName === 'EmploymentDate' ? getSortingType() : ''}/>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user}/>
        ))}
      </tbody>
    </table>
  );
};
