import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faXmark, faFilter} from '@fortawesome/free-solid-svg-icons';
import { Field, useFormik, FormikProvider  } from 'formik';
import {SearchType} from '../../behavior/users/types';
import { format } from 'date-fns';

type Props = {
  searchText: string;
  setSearchText: any;
  startEmploymentDate: string;
  setStartEmploymentDate: any;
  endEmploymentDate: string;
  setEndEmploymentDate: any;
  employmentTypeList: any;
  setEmploymentType: any;
  employmentType: string[];
}

const initialValues: SearchType = {
  searchText: '',
  startEmploymentDate: '',
  endEmploymentDate: '',
  employmentType: [],
};

export const UserSearchPanel = ({
  searchText, 
  setSearchText, 
  setStartEmploymentDate, 
  startEmploymentDate, 
  setEndEmploymentDate, 
  endEmploymentDate, 
  employmentTypeList, 
  setEmploymentType,
  employmentType
}: Props) => {

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: values => {
      setSearchText(values.searchText);
      setEmploymentType(values.employmentType);
      setStartEmploymentDate(values.startEmploymentDate !== '' ? format(new Date(values.startEmploymentDate), 'dd.MM.yyyy') : '');
      setEndEmploymentDate(values.endEmploymentDate !== '' ? format(new Date(values.endEmploymentDate), 'dd.MM.yyyy') : '');
    },
  });

  const handleSearchTextRemove = () => {
    setSearchText('');
    formik.setFieldValue('searchText', '');
  };

  const handleEmploymentDateRemove = () => {
    setStartEmploymentDate('');
    setEndEmploymentDate('');
    formik.setFieldValue('startEmploymentDate', '');
    formik.setFieldValue('endEmploymentDate', '');
  };

  const handleEmploymentTypeRemove = (type: string) => {
    const updatedEmploymentType = employmentType.filter((item: string) => item !== type);
    setEmploymentType(updatedEmploymentType);
    formik.setFieldValue('employmentType', updatedEmploymentType);
  };

  const renderRemoveFilterButton = (content: any, onClick: any) => (
    <div className="btn btn-light" onClick={onClick} title="remove">
      <span>{content}</span>
      <FontAwesomeIcon icon={faXmark} style={{ color: '#ff0000' }} className="ms-1" />
    </div>
  );

  return (
    <div className="d-flex justify-content-between mb-4">
      <div className="col-8">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-2">
            <div className="d-flex gap-2">
              <div className="dropstart">
                <button type="button" className="btn btn-primary" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                  <FontAwesomeIcon icon={faFilter} style={{color: '#ffffff',}}/>
                </button>
                <div className="dropdown-menu p-3 me-2">
                  <div className="d-flex gap-2 flex-column">
                    <span className="h5">Employment date</span>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <label htmlFor="startEmploymentDate">Start:</label>
                      <Field name="startEmploymentDate" type="date" value={formik.values.startEmploymentDate} className="form-control"/>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <label htmlFor="endEmploymentDate">End:</label>
                      <Field name="endEmploymentDate" type="date" value={formik.values.endEmploymentDate} className="form-control"/>
                    </div>
                    <span className="h5 mt-2">Employment type</span>
                    <Field name="employmentType" as="select" className="form-select" multiple>
                      {employmentTypeList.map((employmentType: string) => (
                        <option key={employmentType} value={employmentType}>
                          {employmentType}
                        </option>
                      ))}
                    </Field>
                    <button type="submit" className="btn btn-primary mt-2">Apply</button>
                  </div>
                </div>
              </div>

              <Field name="searchText" type="search" value={formik.values.searchText} className="form-control w-50" placeholder="Search by name or email"/>

              <button className="btn btn-primary" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: '#ffffff',}} />
              </button>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              {searchText !== '' && renderRemoveFilterButton(searchText.length > 40 ? `${searchText.substring(0, 40)}...` : searchText, handleSearchTextRemove)}
              {startEmploymentDate !== '' && renderRemoveFilterButton(endEmploymentDate !== '' ? `${startEmploymentDate} - ${endEmploymentDate}` : startEmploymentDate, handleEmploymentDateRemove)}
              {employmentType.length > 0 && employmentType.map((type: string) => renderRemoveFilterButton(type, () => handleEmploymentTypeRemove(type)))}
            </div>
          </form>
        </FormikProvider>
      </div>

      <div className="col-4 d-flex justify-content-end align-items-start">
        <input type="button" className="form-control btn btn-primary w-auto px-4" value="Create new"/>
      </div>
    </div>
  );
};
