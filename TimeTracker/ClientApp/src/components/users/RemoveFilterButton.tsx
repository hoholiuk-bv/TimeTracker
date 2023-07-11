import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type Props = {
  content: string;
  onClick: () => void;
}

export const RemoveFilterButton = ({content, onClick}: Props) => {
  return (
      // <button type="button" onClick={() => setFieldValue('startEmploymentDate', '')}>
      //     stDate
      // </button>
    <button className="btn btn-light" type="button" onClick={onClick} title="remove">
      <span>
        {content}
      </span>
      <FontAwesomeIcon icon={faXmark} className="ms-1" />
    </button>
      
  // <div className="btn btn-light" onClick={onClick} title="remove">
  //   <span>
  //     {content}
  //   </span>
  //   <FontAwesomeIcon icon={faXmark} className="ms-1" />
  // </div>
  );
};
