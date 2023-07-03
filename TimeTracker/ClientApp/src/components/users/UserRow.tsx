import React from 'react';
import {User} from '../../behavior/users/types';
import {FcDocument} from 'react-icons/fc';
import {FaTrashAlt} from 'react-icons/fa';

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
          <FcDocument size="1.5em"/>
          <FaTrashAlt color="#ED2939" size="1.5em"/>
        </div>
      </td>
    </tr>
  );
};
