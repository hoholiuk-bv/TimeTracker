import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, FormLabel } from 'react-bootstrap';
import { FormGroup } from '../common/elements/FormGroup';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { RootState } from '../../behavior/store';
import { WorktimeFilterType, WorktimeFilterTypeInput } from '../../behavior/worktime/types';
import { required, worktimeYear } from '../../behavior/validators';
import { changeWorktimeRecordsFiltering } from '../../behavior/worktime/actions';

export const WorktimeFilter = () => {
  const dispatch = useDispatch();
  const { filtering } = useSelector((state: RootState) => state.worktime);

  const initialValues: WorktimeFilterTypeInput = {
    userId: filtering.userId,
    year: filtering.year,
    month: (filtering.month - 1).toString(),
  };

  const onSubmit = (values: WorktimeFilterTypeInput) => {
    const newFiltering: WorktimeFilterType = {
      userId: values.userId,
      year: values.year,
      month: parseInt(values.month) + 1,
    };

    dispatch(changeWorktimeRecordsFiltering(newFiltering));
  };

  return (
    <>
      <div>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel htmlFor='year'>Year</FormLabel>
                  <Field name="year" type="number" className="form-control" validate={worktimeYear} mix={1900} />
                  <ValidationMessage fieldName='year' />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel htmlFor='month'>Month</FormLabel>
                  <Field as="select" className="form-control" name="month" validate={required}>
                    {Array.from({ length: 12 }, (_, monthIndex) => (
                      <option key={monthIndex} value={monthIndex}>
                        {(new Date(0, monthIndex)).toLocaleString('default', { month: 'long' })}
                      </option>
                    ))}
                  </Field>
                </FormGroup>
              </Col>
              <Col className="d-flex align-items-end">
                <FormGroup>
                  <button className="btn btn-primary" type="submit">Apply</button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Formik>
      </div>
    </>
  );
};
