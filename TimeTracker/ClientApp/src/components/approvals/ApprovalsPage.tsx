import React, {useState} from 'react';
import { ApprovalList } from './ApprovalList';

export const ApprovalsPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h1 className="mb-3">Approvals</h1>
      <ApprovalList/>
    </>
  );
};