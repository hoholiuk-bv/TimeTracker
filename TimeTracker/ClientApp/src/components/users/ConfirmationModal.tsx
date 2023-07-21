import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {requestToggleActivityStatus} from '../../behavior/users/actions';
import {RootState} from '../../behavior/store';
import {User} from '../../behavior/users/types';

type Props = {
  userId: string;
  handleClose: () => void;
}

export const ConfirmationModal = ({ userId, handleClose }: Props) => {
  const dispatch = useDispatch();
  const user: User | undefined = useSelector((state: RootState) => state.users.list.find(user => user.id === userId));
  const show: boolean = userId !== '';

  const handleConfirmButtonClick = () => {
    dispatch(requestToggleActivityStatus(userId));
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton className="pe-4">
          <Modal.Title>Are you sure you want to {user ? (user.isActive ? 'deactivate' : 'activate') : null} this user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && (
            <Col className="d-flex flex-column gap-2">
              <Row>
                <span className="">Name: {user.name} {user.surname}</span>
              </Row>
              <Row>
                <span className="">Email: {user.email}</span>
              </Row>
            </Col>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <button className="btn btn-secondary" onClick={handleClose}>Close</button>
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={handleConfirmButtonClick}>{user ? (user.isActive ? 'Deactivate' : 'Activate') : null}</button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};
