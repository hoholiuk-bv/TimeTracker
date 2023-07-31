import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { requestCalendarRules } from '../../behavior/calendar/actions';
import { RootState } from '../../behavior/store';
import { RuleList } from './RuleList';
import { RuleModal } from './RuleModal';

export const CalendarSettingsPage = () => {
  const dispatch = useDispatch();
  const [showRuleModal, setShowRuleModal] = useState(false);
  const { rules, sorting } = useSelector((state: RootState) => state.calendar);

  useEffect(() => { dispatch(requestCalendarRules(sorting, { pageNumber: 1, pageSize: 10 })); }, [dispatch, sorting]);

  if (rules === null)
    return null;

  return (
    <>
      <h1>Calendar settigns</h1>
      <Row>
        <Col>
          <Button className='btn btn-primary my-3' onClick={() => setShowRuleModal(true)}>
            Add new rule
          </Button>
          <RuleModal show={showRuleModal} handleClose={() => setShowRuleModal(false)} calendarRule={null} />
          <RuleList rules={rules} sorting={sorting} />
        </Col>
      </Row>
    </>
  );
};
