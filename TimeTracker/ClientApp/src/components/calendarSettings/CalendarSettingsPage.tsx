import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { requestCalendarRules } from '../../behavior/calendar/actions';
import { RootState } from '../../behavior/store';
import { WorkCalendarModal } from '../calendar/WorkCalendarModal';
import { RuleList } from './RuleList';
import { RuleModal } from './RuleModal';

export const CalendarSettingsPage = () => {
  const dispatch = useDispatch();
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const { rules, sorting } = useSelector((state: RootState) => state.calendar);

  useEffect(() => { dispatch(requestCalendarRules(sorting)); }, [dispatch, sorting]);

  if (rules === null)
    return null;

  return (
    <>
      <h1>Calendar settigns</h1>
      <Row>
        <Col>
          <Button className='btn btn-primary my-3 me-3' onClick={() => setShowRuleModal(true)}>
            Add new rule
          </Button>
          <Button className='btn btn-primary my-3' onClick={() => setShowCalendarModal(true)}>
            View calendar
          </Button>
          <RuleModal show={showRuleModal} handleClose={() => setShowRuleModal(false)} calendarRule={null} />
          <WorkCalendarModal show={showCalendarModal} handleClose={() => setShowCalendarModal(false)} />
          <RuleList rules={rules} sorting={sorting} />
        </Col>
      </Row>
    </>
  );
};
