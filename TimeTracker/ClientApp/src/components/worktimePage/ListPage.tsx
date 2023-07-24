import React from 'react';
import { Timer } from './Timer';
import { UserInfo } from '../../behavior/profile/types';


type Props = {
    users: UserInfo | null;
};

export const ListPage = ({ users }: Props) => {
    if (!users) {
        return null;
    }

    return (
        <div className="container">
            <div className="worktime">
                <div className="row">
                    <div className="col">
                        <div className="timer">
                            <table className="table">
                                <tbody className="timer-container">
                                    <Timer user={users} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
