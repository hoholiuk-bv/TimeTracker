import React from 'react';
import { NavigationLink } from './NavigationLink';
import { faPaperPlane, faClock, faCheckCircle, faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { routes } from '../../behavior/routing';
import { usePermissions } from '../../behavior/hooks';
import { PermissionType } from '../../behavior/profile/types';

export const Navigation = () => {
  const [canManageUsers, canConfigureCalendar] = usePermissions([PermissionType.ManageUsers, PermissionType.ConfigureCalendar]);

  return (
    <div className="col-2">
        <NavigationLink
        to={routes.worktime}
        icon={faClock}
        text='Worktime'
        activeRoutes={[routes.worktime]}
      />
      <NavigationLink
        to={routes.daysoff}
        icon={faPaperPlane}
        text='Days off'
        activeRoutes={[routes.daysoff]}
      />
      <NavigationLink
        to={routes.approvals}
        icon={faCheckCircle}
        text='Approvals'
        activeRoutes={[routes.approvals]}
      />
      {canManageUsers &&
        <NavigationLink
          icon={faUser}
          to={routes.users.list}
          text='Users'
          activeRoutes={[routes.users.creation, routes.users.list]}
        />}
      {canConfigureCalendar &&
        <NavigationLink
          to={routes.calendarSettings}
          icon={faCalendar}
          text='Calendar settings'
          activeRoutes={[routes.calendarSettings]}
        />}
    </div>
  );
};
