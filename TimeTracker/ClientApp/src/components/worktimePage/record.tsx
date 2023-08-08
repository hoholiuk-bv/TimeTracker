import React from 'react';
import {WorktimeRecord} from '../../behavior/worktime/types';

type Props = {
    worktime: WorktimeRecord;
}

export const WorktimeRecords = ({ worktime }: Props) => {
   

    return (
        <tr>
            {/*
            <td>{worktime.id}</td>
*/}
          {/*  <td>{worktime.startDate}</td>
            <td>{worktime.userId}</td>*/}
            {/*
            <td>{worktime.userId}</td>
*/}
{/*
            <td>{formattedTimeDifference}</td>
*/}
        </tr>
    );
};