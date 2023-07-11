import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Field, Formik, Form } from 'formik';
import { employmentType, employmentTypeForDisplay, FilterType } from '../../behavior/users/types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../behavior/routing';
import { RemoveFilterButton } from './RemoveFilterButton';

type Props = {
  employmentTypeList: any;
  filter: FilterType;
  setFilter: any;
}

export const UserSearchPanel = ({employmentTypeList, filter, setFilter}: Props) => {
  const navigate = useNavigate();

  const initialValues: FilterType = {
    searchText: '',
    startEmploymentDate: '',
    endEmploymentDate: '',
    employmentTypes: [],
  };

  const onSubmit = (values: FilterType) => {
    setFilter({
      searchText: values.searchText,
      startEmploymentDate: values.startEmploymentDate !== '' && values.startEmploymentDate !== null ? `${values.startEmploymentDate}T00:00:00` : null,
      endEmploymentDate: values.endEmploymentDate !== '' && values.endEmploymentDate !== null ? `${values.endEmploymentDate}T00:00:00` : null,
      employmentTypes: values.employmentTypes
    });
  };

  const handleCreateButtonClick = () => {
    navigate(routes.users.creation);
  };

  const handleSearchTextRemove = (setFieldValue: any) => {
    setFilter((prevFilter: any ) => ({
      ...prevFilter,
      searchText: ''
    }));

    setFieldValue('searchText', '');
  };

  const handleEmploymentDateRemove = (setFieldValue: any) => {
    setFilter((prevFilter: any ) => ({
      ...prevFilter,
      startEmploymentDate: null,
      endEmploymentDate: null
    }));

    setFieldValue('startEmploymentDate', '');
    setFieldValue('endEmploymentDate', '');
  };

  const handleEmploymentTypeRemove = (type: string, setFieldValue: any) => {
    const updatedEmploymentTypes = filter.employmentTypes.filter((item: string) => item !== type);

    setFilter((prevFilter: any ) => ({
      ...prevFilter,
      employmentTypes: updatedEmploymentTypes
    }));

    setFieldValue('employmentTypes', updatedEmploymentTypes);
  };

  const generateRemoveFilterButtons = (setFieldValue: any) => {
    const removeFilterButtons = [];

    if (filter.searchText !== '') {
      removeFilterButtons.push(
        <RemoveFilterButton key={'searchText'} content={filter.searchText} onClick={() => handleSearchTextRemove(setFieldValue)}/>
      );
    }

    if (filter.startEmploymentDate !== '' && filter.startEmploymentDate !== null) {
      let employmentDateContent;

      if(filter.endEmploymentDate !== '' && filter.endEmploymentDate !== null) {
        employmentDateContent = `${format(new Date(filter.startEmploymentDate), 'dd.MM.yyyy')} - ${format(new Date(filter.endEmploymentDate), 'dd.MM.yyyy')}`;
      }
      else {
        employmentDateContent = format(new Date(filter.startEmploymentDate), 'dd.MM.yyyy');
      }

      removeFilterButtons.push(
        <RemoveFilterButton key={'employmentDate'} content={employmentDateContent} onClick={() => handleEmploymentDateRemove(setFieldValue)}/>
      );
    }

    filter.employmentTypes.forEach((type: string) => {
      const employmentTypeKey = Object.keys(employmentType).find(key => employmentType[key as keyof typeof employmentType] === type);
      const content = employmentTypeForDisplay[employmentTypeKey as keyof typeof employmentTypeForDisplay];

      removeFilterButtons.push(
        <RemoveFilterButton key={type} content={content} onClick={() => handleEmploymentTypeRemove(type, setFieldValue)}/>
      );
    });

    return removeFilterButtons;
  };

  return (
    <div className="d-flex justify-content-between mb-4">
      <div className="col-8">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {({setFieldValue, values}) => (
            <Form className="d-flex flex-column gap-2">
              <div className="d-flex gap-2">
                <div className="dropstart">
                  <button type="button" className="btn btn-primary" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                    <FontAwesomeIcon icon={faFilter}/>
                  </button>
                  <div className="dropdown-menu p-3 me-2">
                    <div className="d-flex gap-2 flex-column">
                      <span className="h5">Employment date</span>
                      <div className="d-flex flex-row align-items-center gap-2">
                        <label htmlFor="startEmploymentDate">Start:</label>
                        <Field name="startEmploymentDate" type="date" className="form-control" value={values.startEmploymentDate}/>
                      </div>
                      <div className="d-flex flex-row align-items-center gap-2">
                        <label htmlFor="endEmploymentDate">End:</label>
                        <Field name="endEmploymentDate" type="date" className="form-control" value={values.endEmploymentDate}/>
                      </div>
                      <span className="h5 mt-2">Employment type</span>
                      <Field name="employmentTypes" as="select" className="form-select" multiple>
                        {employmentTypeList.map((type: string) => (
                          <option key={type} value={employmentType[type as keyof typeof employmentType]}>
                            {employmentTypeForDisplay[type as keyof typeof employmentTypeForDisplay]}
                          </option>
                        ))}
                      </Field>
                      <button type="submit" className="btn btn-primary mt-2">Apply</button>
                    </div>
                  </div>
                </div>
                <Field name="searchText" type="search" className="form-control w-50" value={values.searchText} placeholder="Search by name or email" />
                <button className="btn btn-primary" type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                {generateRemoveFilterButtons(setFieldValue)}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="col-4 d-flex justify-content-end align-items-start">
        <input type="button" className="btn btn-primary" onClick={handleCreateButtonClick} value="Create new" />
      </div>
    </div>
  );
};
