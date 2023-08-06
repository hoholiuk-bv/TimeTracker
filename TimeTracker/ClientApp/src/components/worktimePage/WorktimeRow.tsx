import React, { useState } from 'react';
import { WorktimeRecord } from '../../behavior/worktime/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { WorktimeEditingModal } from './WorktimeEditingModal';

type Props = {
  worktimeRecord: WorktimeRecord;
}

export const WorktimeRow = ({ worktimeRecord }: Props) => {
  const [show, setShow] = useState(false);
  const startDate = new Date(worktimeRecord.startDate);
  const finishDate = new Date(worktimeRecord.finishDate);

  const timeDifferenceInMilliseconds = finishDate.getTime() - startDate.getTime();
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
  const hours = Math.floor(timeDifferenceInMinutes / 60);
  const remainingMinutes = timeDifferenceInMinutes % 60;

  return (
    <>
      <tr>
        <td>
          {startDate.toLocaleDateString() + ', ' + startDate.toLocaleTimeString()}
        </td>
        <td>
          {finishDate.toLocaleDateString() + ', ' + finishDate.toLocaleTimeString()}
        </td>
        <td>
          {hours} h. {remainingMinutes} m.
        </td>
        <td>
          {worktimeRecord.lastEditor}
        </td>
        <td className='text-end pe-3'>
          <FontAwesomeIcon icon={faFileLines} onClick={() => setShow(true)} className="details-action" title="Edit" />
        </td>
      </tr>
      <WorktimeEditingModal worktimeRecord={worktimeRecord} show={show} handleClose={() => setShow(false)}/>
    </>
  );
};
