import React from 'react';
import {UserRow} from './UserRow';
import {User} from '../../behavior/users/types';

type Props = {
    users: User[];
}

export const UserTable = ({users}: Props) => {
  return (
    <table className="table table-striped mb-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Employment type</th>
          <th colSpan={2}>Employment date</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <UserRow
            key={user.id}
            user={user}
          />
        )}
      </tbody>
    </table>
  );
};
