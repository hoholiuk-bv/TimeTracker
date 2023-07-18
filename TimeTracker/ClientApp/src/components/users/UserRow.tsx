import React from 'react';
import { User } from '../../behavior/users/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileLines } from '@fortawesome/free-solid-svg-icons';

type Props = {
  user: User;
}

export const UserRow = ({ user }: Props) => {
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
      <td className='align-middle'>
        <div className="d-flex gap-4 justify-content-end">
          <FontAwesomeIcon icon={faFileLines} className="user-action details-action" title="details" />
          <FontAwesomeIcon icon={faEye} className="user-action hide-action" title="deactivate" />
        </div>
      </td>
    </tr>
  );
};
