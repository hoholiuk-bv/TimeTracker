import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
  content: string;
  onClick: () => void;
}

export const RemoveFilterButton = ({content, onClick}: Props) => {
  return (
    <div className='remove-filter-button'>
      <span className="me-1">
        {content}
      </span>
      <Button variant='link' className='tag-close-btn' onClick={onClick}>x</Button>
    </div>
  );
};
