import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { requestUserUpdate } from '../../behavior/userDetails/actions';
import { UpdateUserInput, UpdateUserType } from '../../behavior/userDetails/types';
import { MaxWorkingHours } from '../../behavior/common/types';

type Props = {
  values: UpdateUserInput | null;
  handleClose: () => void;
  selectedApprovers: any;
}

export const ConfirmationModal = ({ values, handleClose, selectedApprovers }: Props) => {
  const dispatch = useDispatch();
  const show: boolean = values !== null;

  const handleConfirmButtonClick = () => {
    if(values !== null) {
      const { hours, minutes, ...otherValues } = values;
      const workingHoursCount = (hours ?? 0) + (minutes ?? 0) / 100;

      const user: UpdateUserType = {
        ...otherValues,
        approversIdList: selectedApprovers.map((options: any) => options.value),
        workingHoursCount: (hours !== null && hours < MaxWorkingHours) ? workingHoursCount : hours,
      };

      dispatch(requestUserUpdate(user));
    }

    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton className="pe-4">
          <Modal.Title>
            <span>Are you sure you want to update the data?</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Row>
            <Col>
              <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={handleConfirmButtonClick}>Save</button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};
