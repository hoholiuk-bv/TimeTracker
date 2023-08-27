import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Field, Formik, Form } from 'formik';
import { employmentType, employmentTypeForDisplay, FilterType } from '../../behavior/users/types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../behavior/routing';
import { changeUserListFiltering } from '../../behavior/users/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SelectElementOptions } from '../../behavior/common/types';
import { FormLabel } from 'react-bootstrap';
import { FormGroup } from '../common/elements/FormGroup';
import { ActiveUserFilters } from './ActiveUserFilters';
import Collapse from 'react-bootstrap/Collapse';
import Select from 'react-select';
import BootstrapForm from 'react-bootstrap/Form';
import { RootState } from '../../behavior/store';
import { requestUrlForDownloadingWorktimeStats } from '../../behavior/worktime/actions';

type Props = {
  filtering: FilterType;
}

export const UserSearchPanel = ({filtering}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { totalUsersCount } = useSelector((state: RootState) => state.users);
  const [isExportButtonVisible, setIsExportButtonVisible] = useState<boolean>(false);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<SelectElementOptions[]>([]);
  const employmentTypesOptions: SelectElementOptions[] = Object.keys(employmentType).map((type: string) => ({
    value: employmentType[type as keyof typeof employmentType],
    label: employmentTypeForDisplay[type as keyof typeof employmentTypeForDisplay]
  }));

  useEffect(() => {
    setIsExportButtonVisible(totalUsersCount > 0);
  }, [totalUsersCount]);
  
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
      startEmploymentDate: values.startEmploymentDate ? new Date(values.startEmploymentDate).toISOString() : null,
      endEmploymentDate: values.endEmploymentDate ? new Date(values.endEmploymentDate).toISOString() : null,
      employmentTypes: selectedEmploymentTypes.map(({ value }) => value),
      showOnlyActiveUsers: values.showOnlyActiveUsers,
    };

    dispatch(changeUserListFiltering(newFiltering));
  };

  const exportButtonClick = () => {
    dispatch(requestUrlForDownloadingWorktimeStats(filtering));
  };

  return (
    <div className="d-flex justify-content-between">
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
                  <div className="row">
                    <div className="col-4">
                      <FormGroup>
                        <FormLabel htmlFor="startEmploymentDate">Start date</FormLabel>
                        <Field name="startEmploymentDate" type="date" className="form-control" value={values.startEmploymentDate}/>
                      </FormGroup>
                    </div>
                    <div className="col-4">
                      <FormGroup>
                        <FormLabel htmlFor="endEmploymentDate">Finish date</FormLabel>
                        <Field name="endEmploymentDate" type="date" className="form-control" value={values.endEmploymentDate}/>
                      </FormGroup>
                    </div>
                    <div className="col-4 d-flex align-items-end">
                      <FormGroup>
                        <FormLabel htmlFor='showOnlyActiveUsers' className="user-select-none"></FormLabel>
                        <div className="d-flex gap-2">
                          <Field as={BootstrapForm.Check} id="showOnlyActiveUsers" name="showOnlyActiveUsers" checked={values.showOnlyActiveUsers} />
                          <FormLabel htmlFor='showOnlyActiveUsers' className="user-select-none">Show only active users</FormLabel>
                        </div>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
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
                    </div>
                    <div className="col-4 d-flex align-items-end">
                      <FormGroup>
                        <button type="submit" className="btn btn-primary mt-2">Apply</button>
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </Collapse>
              <div className="d-flex gap-2 flex-wrap mb-2">
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
      <div className="col-4 d-flex justify-content-end align-items-start gap-2">
        {isExportButtonVisible && (
          <button onClick={exportButtonClick} className="btn btn-primary" type="button">Export worktime</button>
        )}
        <input type="button" className="btn btn-primary" onClick={() => navigate(routes.users.creation)} value="Create new" />
      </div>
    </div>
  );
};
