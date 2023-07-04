import React from 'react';
import {User} from '../../behavior/users/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan, faFileLines} from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faFileLines} size="xl" style={{color: '#2977ff'}}/>
          <FontAwesomeIcon icon={faTrashCan} size="xl" style={{color: '#ED2939'}}/>
        </div>
      </td>
    </tr>
  );
};
