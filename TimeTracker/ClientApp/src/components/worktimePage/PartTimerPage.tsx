import React from 'react';
import { Timer } from './Timer';
import { UserInfo } from '../../behavior/profile/types';
import {WorktimeRecord} from '../../behavior/worktime/types';


type Props = {
    users: UserInfo | null,
    worktime: WorktimeRecord | null;
};

export const PartTimerPage = ({ users, worktime }: Props) => {
    if (!users) {
        return null;
    }
   

    return (
        <div className="container">
            <div className="worktime">
                <div className="row">
                    <div className="col">
                        <div className="timer">
                            <table>
                                <tbody className="timer-container">
                                    <Timer user={users} worktime={worktime}/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  );
};
