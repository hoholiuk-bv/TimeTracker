import React, {useState} from 'react';
import { UserRow } from './UserRow';
import { User } from '../../behavior/users/types';
import { SortingInput, SortingOrder } from '../../behavior/common/types';
import { SortIcon } from '../common/elements/SortIcon';
import { ConfirmationModal } from './ConfirmationModal';

type Props = {
  userList: User[];
  sorting: SortingInput;
  setSorting: React.Dispatch<React.SetStateAction<SortingInput>>;
};

export const UserTable = ({ userList, sorting, setSorting }: Props) => {
  const [userId, setUserId] = useState('');
  const confirmationModalClose = () => setUserId('');
  const confirmationModalShow = (userId: string) => setUserId(userId);
  const defaultSortingField = 'EmploymentDate';

  const handleSortingColumnClick = (fieldName: string) => {
    if (fieldName !== sorting.sortingField) {
      setSorting({ sortingField: fieldName, sortingOrder: SortingOrder.Ascending });
    }
    else {
      switch (sorting.sortingOrder) {
      case SortingOrder.Ascending:
        setSorting(previousSorting => ({ ...previousSorting, sortingOrder: SortingOrder.Descending }));
        break;
      case SortingOrder.Descending:
        setSorting({ sortingField: defaultSortingField, sortingOrder: SortingOrder.Ascending });
      }
    }
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
            <UserRow key={user.id} user={user} confirmationModalShow={confirmationModalShow} />
          ))}
        </tbody>
      </table>
      <ConfirmationModal userId={userId} handleClose={confirmationModalClose}/>
    </>
  );
};
