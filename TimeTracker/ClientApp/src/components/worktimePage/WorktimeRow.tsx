import React, { useState } from 'react';
import { WorktimeRecord } from '../../behavior/worktime/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { WorktimeEditingModal } from './WorktimeEditingModal';
import { Button } from 'react-bootstrap';

type Props = {
  worktimeRecord: WorktimeRecord;
}

export const WorktimeRow = ({ worktimeRecord }: Props) => {
  const [show, setShow] = useState(false);

  if(worktimeRecord.finishDate === null)
    return null;

  const startDate = new Date(worktimeRecord.startDate);
  const finishDate = new Date(worktimeRecord.finishDate);

  const timeDifferenceInMilliseconds = finishDate.getTime() - startDate.getTime();
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
  const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
  const workedHours = Math.floor(timeDifferenceInMinutes / 60);
  const workedMinutes = timeDifferenceInMinutes % 60;
  const workedSeconds = timeDifferenceInSeconds % 60;

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
          {workedHours > 0 && `${workedHours}h `}
          {workedMinutes > 0 && `${workedMinutes}m `}
          {workedHours === 0 && workedMinutes === 0 && `${workedSeconds}s `}
        </td>
        <td>
          {worktimeRecord.lastEditorName}
        </td>
        <td>
          <Button variant="Link" className="table-action-button" title="Edit" onClick={() => setShow(true)}>
            <FontAwesomeIcon icon={faFileLines} />
          </Button>
        </td>
      </tr>
      <WorktimeEditingModal worktimeRecord={worktimeRecord} show={show} handleClose={() => setShow(false)}/>
    </>
  );
};
