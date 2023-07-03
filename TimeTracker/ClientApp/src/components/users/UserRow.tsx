import React from 'react';
import {User} from '../../behavior/users/types';

type Props = {
    user: User;
}

export const UserRow = ({user}: Props) => {
  return (
    <tr>
      <td>
        {user.name + ' ' + user.surname}
      </td>
      <td>
        {user.email}
      </td>
      <td>
        {user.employmentType}
      </td>
      <td>
        {user.employmentDate.toString()}
      </td>
      <td>
        <div className="d-flex gap-3 justify-content-end">
        </div>
      </td>
    </tr>
  );
};
