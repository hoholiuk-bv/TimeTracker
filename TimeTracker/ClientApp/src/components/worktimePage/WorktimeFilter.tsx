import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, FormLabel } from 'react-bootstrap';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { RootState } from '../../behavior/store';
import { WorktimeFilterType, WorktimeFilterTypeInput } from '../../behavior/worktime/types';
import { required, worktimeYear } from '../../behavior/validators';
import { changeWorktimeRecordsFiltering, requestWorktimeStatsFileUrl } from '../../behavior/worktime/actions';
import { useLocation } from 'react-router-dom';
import { routes } from '../../behavior/routing';

type Props = {
  userId: string;
}

export const WorktimeFilter = ({ userId } : Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { filtering, recordCount } = useSelector((state: RootState) => state.worktime);
  const [isExportButtonVisible, setIsExportButtonVisible] = useState(false);

  useEffect(() => {
    setIsExportButtonVisible(location.pathname === routes.users.worktime.replace(':id', userId) && recordCount > 0);
  }, [location.pathname, userId, recordCount]);

  const initialValues: WorktimeFilterTypeInput = {
    userId: userId,
    year: filtering.year,
    month: (filtering.month - 1).toString(),
  };

  const onSubmit = (values: WorktimeFilterTypeInput) => {
    const newFiltering: WorktimeFilterType = {
      userId: userId,
      year: values.year,
      month: parseInt(values.month) + 1,
    };

    dispatch(changeWorktimeRecordsFiltering(newFiltering));
  };

  const exportButtonClick = () => {
    dispatch(requestWorktimeStatsFileUrl(filtering));
  };
  
  return (
    <div>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        <Form>
          <Row>
            <Col>
              <FormLabel htmlFor='year'>Year</FormLabel>
              <Field name="year" type="number" className="form-control" validate={worktimeYear} mix={1900} />
            </Col>
            <Col>
              <FormLabel htmlFor='month'>Month</FormLabel>
              <Field as="select" className="form-control" name="month" validate={required}>
                {Array.from({ length: 12 }, (_, monthIndex) => (
                  <option key={monthIndex} value={monthIndex}>
                    {(new Date(0, monthIndex)).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </Field>
            </Col>
            <Col className="d-flex align-items-end justify-content-between">
              <button className="btn btn-primary" type="submit">Apply</button>
              {isExportButtonVisible && (
                <button onClick={exportButtonClick} className="btn btn-primary" type="button">Export as xlsx</button>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <ValidationMessage fieldName='year' />
            </Col>
          </Row>
        </Form>
      </Formik>
    </div>
  );
};
