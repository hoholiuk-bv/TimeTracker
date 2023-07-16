import React from 'react';
import { Timer } from './Timer';
import { UserInfo } from '../../behavior/profile/types';
import {Worktime} from '../../behavior/worktime/types';

type Props = {
    users: UserInfo | null;
};

export const ListPage = ({ users }: Props) => {
    if (!users) {
        return null; 
    }

    return (
        <table className="table table-striped mb-4">
            <tbody>
            <Timer user={users} />
            </tbody>
        </table>
    );
};
