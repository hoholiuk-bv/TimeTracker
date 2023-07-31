import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Field, Formik, Form } from 'formik';
import { employmentType, employmentTypeForDisplay, FilterType } from '../../behavior/users/types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../behavior/routing';
import { RemoveFilterButton } from './RemoveFilterButton';
import { changeUserListFiltering } from '../../behavior/users/actions';
import { useDispatch } from 'react-redux';

type Props = {
  filtering: FilterType;
}

export const UserSearchPanel = ({filtering}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: FilterType = {
    searchText: '',
    startEmploymentDate: '',
    endEmploymentDate: '',
    employmentTypes: [],
  };

  const onSubmit = (values: FilterType) => {
    const newFiltering = {
      searchText: values.searchText,
      startEmploymentDate: values.startEmploymentDate !== '' && values.startEmploymentDate !== null ? `${values.startEmploymentDate}T00:00:00` : null,
      endEmploymentDate: values.endEmploymentDate !== '' && values.endEmploymentDate !== null ? `${values.endEmploymentDate}T00:00:00` : null,
      employmentTypes: values.employmentTypes
    };

    dispatch(changeUserListFiltering(newFiltering));
  };

  const handleCreateButtonClick = () => {
    navigate(routes.users.creation);
  };

  const handleSearchTextRemove = (setFieldValue: any) => {
    const newFiltering = { ...filtering, searchText: '' };
    dispatch(changeUserListFiltering(newFiltering));

    setFieldValue('searchText', '');
  };

  const handleEmploymentDateRemove = (setFieldValue: any) => {
    const newFiltering = { ...filtering, startEmploymentDate: null, endEmploymentDate: null };
    dispatch(changeUserListFiltering(newFiltering));

    setFieldValue('startEmploymentDate', '');
    setFieldValue('endEmploymentDate', '');
  };

  const handleEmploymentTypeRemove = (type: string, setFieldValue: any) => {
    const updatedEmploymentTypes = filtering.employmentTypes.filter((item: string) => item !== type);
    const newFiltering = { ...filtering, employmentTypes: updatedEmploymentTypes };
    dispatch(changeUserListFiltering(newFiltering));

    setFieldValue('employmentTypes', updatedEmploymentTypes);
  };

  const generateRemoveFilterButtons = (setFieldValue: any) => {
    const removeFilterButtons = [];

    if (filtering.searchText !== '') {
      removeFilterButtons.push(
        <RemoveFilterButton key={'searchText'} content={filtering.searchText} onClick={() => handleSearchTextRemove(setFieldValue)}/>
      );
    }

    if (filtering.startEmploymentDate !== '' && filtering.startEmploymentDate !== null) {
      let employmentDateContent;

      if(filtering.endEmploymentDate !== '' && filtering.endEmploymentDate !== null) {
        employmentDateContent = `${new Date(filtering.startEmploymentDate).toLocaleDateString()} - ${new Date(filtering.endEmploymentDate).toLocaleDateString()}`;
      }
      else {
        employmentDateContent = new Date(filtering.startEmploymentDate).toLocaleDateString();
      }

      removeFilterButtons.push(
        <RemoveFilterButton key={'employmentDate'} content={employmentDateContent} onClick={() => handleEmploymentDateRemove(setFieldValue)}/>
      );
    }

    filtering.employmentTypes.forEach((type: string) => {
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
                        {Object.keys(employmentType).map((type: string) => (
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
