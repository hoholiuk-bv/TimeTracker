import { faFileLines, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { CalendarRule, CalendarRuleType } from '../../behavior/calendar/types';
import { CalendarRuleRecurringPeriodTitle, CalendarRuleTypeTitle } from '../common/helpers';
import { RuleModal } from './RuleModal';
import {RuleDeletionModal} from './RuleDeletionModal';

type Props = {
  item: CalendarRule
}

export const RuleItem = ({ item }: Props) => {
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const { title, startDate, finishDate, type, isRecurring, recurringFrequency, recurringPeriod, shortDayDuration, id } = item;

  return (
    <>
      <tr>
        <td>
          {title}
        </td>
        <td>
          {CalendarRuleTypeTitle[type]}{type === CalendarRuleType.ShortDay && ` - ${shortDayDuration} hour(s)`}
        </td>
        <td>
          {startDate}
        </td>
        <td>
          {finishDate}
        </td>
        <td>
          {isRecurring && recurringPeriod && <span>every {`${recurringFrequency} ${CalendarRuleRecurringPeriodTitle[recurringPeriod].toLowerCase()}(s)`}</span>}
        </td>
        <td>
          <Button variant='Link' className='table-action-button'>
            <FontAwesomeIcon icon={faFileLines} title="Details" onClick={() => setShowRuleModal(true)} />
          </Button>
        </td>
        <td>
          <Button variant='Link' className='table-action-button'>
            <FontAwesomeIcon icon={faTrashCan} onClick={() => setShowDeletionModal(true)}/>
          </Button>
          <RuleDeletionModal show={showDeletionModal} handleClose={() => setShowDeletionModal(false)} ruleId={id}/>
        </td>
      </tr>
      <RuleModal
        show={showRuleModal}
        handleClose={() => setShowRuleModal(false)}
        calendarRule={{
          ...item,
          startDate: new Date(item.startDate).toLocaleDateString('en-CA'),
          finishDate: item.finishDate ? new Date(item.finishDate).toLocaleDateString('en-CA') : null,
          exceptions: item.exceptions && item.exceptions.length ? item.exceptions.map(e => new Date(e)) : null
        }}
      />
    </>
  );
};
