import React from 'react';
import { usePermissions } from '../../behavior/hooks';
import { PermissionType } from '../../behavior/profile/types';
import { NotFound } from './NotFound';

type Props = {
  requiredPermissions?: PermissionType[];
  children: string | JSX.Element | JSX.Element[];
}

export const Page = ({ requiredPermissions, children }: Props) => {
  const permissions = usePermissions(requiredPermissions ?? []);
  const accessDenied = permissions.some(p => !p);

  return (
    <>{accessDenied ? <NotFound /> : <div className='page'>{children}</div>}</>
  );
};
