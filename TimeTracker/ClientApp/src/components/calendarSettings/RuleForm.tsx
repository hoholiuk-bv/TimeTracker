import { Field, FieldArray, useFormikContext } from 'formik';
import React from 'react';
import { Col, Container, FormLabel, Row } from 'react-bootstrap';
import { FormGroup } from '../common/elements/FormGroup';
import Form from 'react-bootstrap/Form';
import { CalendarRuleInput, CalendarRulePeriod, CalendarRuleType } from '../../behavior/calendar/types';
import { RuleExceptionsInput } from './RuleExceptionsInput';

export const RuleForm = () => {
  const { values } = useFormikContext<CalendarRuleInput>();
  return (
    <>
      <Container>
        <Row>
          <Col xs={8}>
            <FormGroup>
              <FormLabel>Title</FormLabel>
              <Field
                type="text"
                className="form-control"
                name="title" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Display title</FormLabel>
              <Field as={Form.Check} name="displayTitle" checked={values.displayTitle} />
            </FormGroup>
          </Col>
          {values.type === CalendarRuleType.ShortDay &&
            <Col>
              <FormGroup>
                <FormLabel>Working hours</FormLabel>
                <Field
                  type="number"
                  min="1"
                  step="0.5"
                  className="form-control"
                  name="shortDayDuration" />
              </FormGroup>
            </Col>}
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Type</FormLabel>
              <Field as={Form.Select} name="type">
                <option value={CalendarRuleType.NonWorkingDay}>Non-working day</option>
                <option value={CalendarRuleType.ShortDay}>Short day</option>
                <option value={CalendarRuleType.Holiday}>Holiday</option>
              </Field>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Start date</FormLabel>
              <Field
                type="date"
                className="form-control date"
                name="startDate" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Finish date</FormLabel>
              <Field
                type="date"
                className="form-control date"
                name="finishDate" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Recurring</FormLabel>
              <Field as={Form.Check} name="isRecurring" checked={values.isRecurring} />
            </FormGroup>
          </Col>
          {values.isRecurring &&
            <>
              <Col>
                <FormGroup>
                  <FormLabel>Every</FormLabel>
                  <Field
                    type="number"
                    className="form-control date"
                    name="recurringFrequency"
                    min="1"
                  />
                </FormGroup>
              </Col>
              <Col>
                <Field className='recurringFrequencyInput' as={Form.Select} name="recurringPeriod">
                  <option value={CalendarRulePeriod.Day}>Day</option>
                  <option value={CalendarRulePeriod.Week}>Week</option>
                  <option value={CalendarRulePeriod.Month}>Month</option>
                  <option value={CalendarRulePeriod.Year}>Year</option>
                </Field>
              </Col>
            </>
          }
        </Row>
        <FieldArray name='exceptions'
          render={({ push, remove }) => (<RuleExceptionsInput values={values.exceptions} push={push} remove={remove} />)}
        />
      </Container>
    </>
  );
};
