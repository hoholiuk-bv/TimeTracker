import React from 'react';
import {employmentType, employmentTypeForDisplay, User} from '../../behavior/users/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileLines, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

type Props = {
  user: User;
  confirmationModalShow: any;
}

export const UserRow = ({ user, confirmationModalShow }: Props) => {
  const employmentTypeKey = Object.keys(employmentType).find(key => employmentType[key as keyof typeof employmentType] === user.employmentType);
  const formattedEmploymentType = employmentTypeForDisplay[employmentTypeKey as keyof typeof employmentTypeForDisplay];
  const formattedEmploymentDate = new Date(user.employmentDate).toLocaleDateString();

  return (
    <tr>
      <td>
        {user.surname + ' ' + user.name}
      </td>
      <td>
        {user.email}
      </td>
      <td>
        {formattedEmploymentType}
      </td>
      <td>
        {formattedEmploymentDate}
      </td>
      <td className='align-middle'>
        <div className="d-flex gap-4 justify-content-end">
          <FontAwesomeIcon icon={faFileLines} className="user-action details-action" title="details" />
          {user.isActive ? (
            <FontAwesomeIcon icon={faEye} className="user-action hide-action" title="deactivate" onClick={() => confirmationModalShow(user.id)} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} className="user-action hide-action" title="activate" onClick={() => confirmationModalShow(user.id)} />
          )}
        </div>
      </td>
    </tr>
  );
};
