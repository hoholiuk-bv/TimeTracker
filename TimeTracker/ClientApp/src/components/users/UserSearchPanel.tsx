import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Field, Formik, Form } from 'formik';
import { employmentType, employmentTypeForDisplay, FilterType } from '../../behavior/users/types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../behavior/routing';
import { changeUserListFiltering } from '../../behavior/users/actions';
import { useDispatch } from 'react-redux';
import { SelectElementOptions } from '../../behavior/common/types';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { FormGroup } from '../common/elements/FormGroup';
import { ActiveUserFilters } from './ActiveUserFilters';
import Collapse from 'react-bootstrap/Collapse';
import Select from 'react-select';
import BootstrapForm from 'react-bootstrap/Form';

type Props = {
  filtering: FilterType;
}

export const UserSearchPanel = ({filtering}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<SelectElementOptions[]>([]);
  const employmentTypesOptions: SelectElementOptions[] = Object.keys(employmentType).map((type: string) => ({
    value: employmentType[type as keyof typeof employmentType],
    label: employmentTypeForDisplay[type as keyof typeof employmentTypeForDisplay]
  }));

  const initialValues: FilterType = {
    searchText: '',
    startEmploymentDate: '',
    endEmploymentDate: '',
    employmentTypes: [],
    showOnlyActiveUsers: filtering.showOnlyActiveUsers,
  };

  const onSubmit = (values: FilterType) => {
    const newFiltering = {
      searchText: values.searchText,
      startEmploymentDate: values.startEmploymentDate !== '' && values.startEmploymentDate !== null ? `${values.startEmploymentDate}T00:00:00` : null,
      endEmploymentDate: values.endEmploymentDate !== '' && values.endEmploymentDate !== null ? `${values.endEmploymentDate}T00:00:00` : null,
      employmentTypes: selectedEmploymentTypes.map(options => options.value),
      showOnlyActiveUsers: values.showOnlyActiveUsers,
    };

    dispatch(changeUserListFiltering(newFiltering));
  };

  return (
    <div className="d-flex justify-content-between mb-4">
      <div className="col-8">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {({setFieldValue, values}) => (
            <Form className="d-flex flex-column gap-2">
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-primary" onClick={() => setOpen(!open)}>
                  <FontAwesomeIcon icon={faFilter}/>
                </button>
                <Field name="searchText" type="search" className="form-control w-50" value={values.searchText} placeholder="Search by name or email" />
                <button className="btn btn-primary" type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
              </div>
              <Collapse in={open}>
                <div>
                  <Row>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor="startEmploymentDate">Start date</FormLabel>
                        <Field name="startEmploymentDate" type="date" className="form-control" value={values.startEmploymentDate}/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor="employmentTypes">Employment types</FormLabel>
                        <Select
                          isMulti
                          name="employmentTypes"
                          options={employmentTypesOptions}
                          value={selectedEmploymentTypes}
                          onChange={(selectedOptions: any) => setSelectedEmploymentTypes(selectedOptions)}
                          className="approvers-picker"
                          placeholder="Select a type..."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor="endEmploymentDate">Finish date</FormLabel>
                        <Field name="endEmploymentDate" type="date" className="form-control" value={values.endEmploymentDate}/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='showOnlyActiveUsers' className="user-select-none">Show only active users</FormLabel>
                        <Field as={BootstrapForm.Check} id="showOnlyActiveUsers" name="showOnlyActiveUsers" checked={values.showOnlyActiveUsers} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button type="submit" className="btn btn-primary mt-2">Apply</button>
                    </Col>
                  </Row>
                </div>
              </Collapse>
              <div className="d-flex gap-2 flex-wrap">
                <ActiveUserFilters
                  filtering={filtering} 
                  setFieldValue={setFieldValue}
                  selectedEmploymentTypes={selectedEmploymentTypes}
                  setSelectedEmploymentTypes={setSelectedEmploymentTypes}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="col-4 d-flex justify-content-end align-items-start">
        <input type="button" className="btn btn-primary" onClick={() => navigate(routes.users.creation)} value="Create new" />
      </div>
    </div>
  );
};
