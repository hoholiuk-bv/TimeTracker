import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { requestUser } from '../../behavior/userDetails/actions';
import { Col, Row } from 'react-bootstrap';
import { Label } from 'reactstrap';
import { employmentType, employmentTypeForDisplay } from '../../behavior/users/types';
import { ChangePasswordModal } from './ChangePasswordModal';

export const UserCabinetPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.userDetails);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (userInfo)
      dispatch(requestUser(userInfo.id));
  }, [dispatch, userInfo]);

  if (!userInfo || !user) {
    return null;
  }

  const indexOfEmploymentType = Object.values(employmentType).indexOf(user.employmentType as unknown as employmentType);
  const userEmploymentType = Object.values(employmentTypeForDisplay)[indexOfEmploymentType];
  const [userWorkingHours, userWorkingMinutes] = user.workingHoursCount.toString().split('.').map(Number);

  const approverList = () => {
    if (user.approvers.length < 1)
      return 'No Approvers';

    const approverNames = user.approvers.map((approver) => `${approver.name} ${approver.surname}`);
    return approverNames.join(' | ');
  };

  return (
    <>
      <h1>{user.name} {user.surname}</h1>
      <Col className="mt-3 mb-2">
        <Row>
          <Col>
            <Label>Email</Label>
            <p>{user.email}</p>
          </Col>
          <Col>
            <Label>Employment date</Label>
            <p>{new Date(user.employmentDate).toLocaleDateString()}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Days off count</Label>
            <p>{user.daysOffCount}</p>
          </Col>
          <Col>
            <Label>Employment type</Label>
            <p>
              {userEmploymentType}
              {employmentTypeForDisplay.PartTime === userEmploymentType && (
                <>
                  {' ('}
                  {userWorkingHours > 0 && ` ${userWorkingHours}h `}
                  {userWorkingMinutes > 0 && ` ${userWorkingMinutes * 10}m `}
                  {')'}
                </>
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Approvers</Label>
            <p>{approverList()}</p>
          </Col>
        </Row>
      </Col>
      <Row>
        <Col>
          <button className="btn btn-primary" onClick={() => setShowPasswordModal(true)}>Change password</button>
        </Col>
      </Row>
      <ChangePasswordModal show={showPasswordModal} handleClose={() => setShowPasswordModal(false)} />
    </>
  );
};
