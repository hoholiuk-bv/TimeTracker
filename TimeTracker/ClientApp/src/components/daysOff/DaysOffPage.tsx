import React, { useState } from 'react';
import { DayOffList } from './DayOffList';
import { NewRequestModal } from './NewRequestModal';

export const DaysOffPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h1 className="mb-3">Days off</h1>
      <button className="btn btn-primary w-500 mt-2" onClick={handleShow}>Request a day off</button>
      <NewRequestModal show={show} handleClose={handleClose}/>
      <DayOffList />
    </>
  );
};