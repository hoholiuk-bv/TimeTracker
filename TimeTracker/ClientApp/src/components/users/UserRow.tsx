import React from 'react';
import { employmentType, employmentTypeForDisplay, User } from '../../behavior/users/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../behavior/routing';

type Props = {
  user: User;
}

export const UserRow = ({ user }: Props) => {
  const navigate = useNavigate();
  const employmentTypeKey = Object.keys(employmentType).find(key => employmentType[key as keyof typeof employmentType] === user.employmentType);
  const formattedEmploymentType = employmentTypeForDisplay[employmentTypeKey as keyof typeof employmentTypeForDisplay];
  const formattedEmploymentDate = new Date(user.employmentDate).toLocaleDateString();

  const handleUserDetailButtonClick = () => navigate(routes.users.details.replace(':id', user.id));

  return (
    <tr>
      <td>
        {user.name + ' ' + user.surname}
        {!user.isActive && <FontAwesomeIcon icon={faEyeSlash} className="hidden-marker" title="User deactivated" />}
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
      <td className='text-end pe-3'>
        <FontAwesomeIcon icon={faFileLines} className="details-action" title="Details" onClick={handleUserDetailButtonClick} />
      </td>
    </tr>
  );
};
