import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, FormLabel } from 'react-bootstrap';
import { FormGroup } from '../common/elements/FormGroup';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { RootState } from '../../behavior/store';
import { FilterType } from '../../behavior/worktime/types';
import { worktimeMonth, worktimeYear } from '../../behavior/validators';
import { changeWorktimeRecordsFiltering } from '../../behavior/worktime/actions';

export const WorktimeFilter = () => {
  const dispatch = useDispatch();
  const { filtering } = useSelector((state: RootState) => state.worktime);
    
  const initialValues: FilterType = {
    userId: filtering.userId,
    year: filtering.year,
    month: filtering.month,
  };

  const onSubmit = (values: FilterType) => {
    dispatch(changeWorktimeRecordsFiltering(values));
  };

  return (
    <>
      <div>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {({values}) => (
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
                    <FormLabel htmlFor='month'>Month ({(new Date(values.year, values.month - 1)).toLocaleString('default', { month: 'long' })})</FormLabel>
                    <Field name="month" type="number" className="form-control" validate={worktimeMonth} min={1} max={12} />
                    <ValidationMessage fieldName='month' />
                  </FormGroup>
                </Col>
                <Col className="d-flex align-items-end">
                  <FormGroup>
                    <button className="btn btn-primary" type="submit">Apply</button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
