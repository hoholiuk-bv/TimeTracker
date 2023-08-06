import React from 'react';
import { Timer } from './Timer';
import { UserInfo } from '../../behavior/profile/types';
import {Worktime} from '../../behavior/worktime/types';
import {WorktimeRecords} from './record';


type Props = {
    users: UserInfo | null,
    worktime: Worktime | null;
};

export const ListPage = ({ users, worktime }: Props) => {
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
                                    <Timer user={users} worktime={worktime}/>
                                </tbody>
                                {worktime && <WorktimeRecords key={worktime.id} worktime={worktime} />}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  );
};
