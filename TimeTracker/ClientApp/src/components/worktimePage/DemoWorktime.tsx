import React from 'react';
import { User } from '../../behavior/users/types';
import { WorktimePage } from './WorktimePage';
import { UserInfo } from '../../behavior/profile/types';

type Props = {
    users: UserInfo | null;
};

export const DemoWorktime = ({ users }: Props) => {
    if (!users) {
        return null; 
    }

    return (
        <table className="table table-striped mb-4">
            <tbody>
            <WorktimePage user={users} />
            </tbody>
        </table>
    );
};
