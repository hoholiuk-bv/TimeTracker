import React from 'react';
import { usePermissions } from '../../behavior/hooks';
import { PermissionType } from '../../behavior/profile/types';
import { NotFound } from './NotFound';
import {FullTimerPage} from '../worktimePage/FullTimerPage';

type Props = {
    worktimePermission?: PermissionType[];
    children: string | JSX.Element | JSX.Element[];
}

export const PageForFullTimer = ({ worktimePermission, children }: Props) => {
    const permissions = usePermissions(worktimePermission ?? []);
    const accessDenied = permissions.some(p => !p);

    return (
        <>{accessDenied ? <FullTimerPage /> : <div className='page'>{children}</div>}</>
    );
};
