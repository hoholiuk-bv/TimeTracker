import React from 'react';
import { Timer } from './Timer';
import { UserInfo } from '../../behavior/profile/types';
import {WorktimeRecord} from '../../behavior/worktime/types';


type Props = {
    user: UserInfo | null,
    worktime: WorktimeRecord | null;
};

export const PartTimerPage = ({ user, worktime }: Props) => {
    if (!user) {
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
                                    <Timer user={user} worktime={worktime}/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  );
};
