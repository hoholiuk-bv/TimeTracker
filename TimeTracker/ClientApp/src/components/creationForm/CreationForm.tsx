import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { CreationInput } from '../../behavior/userCreation/types';
import { useDispatch } from 'react-redux';
import { register } from '../../behavior/userCreation/actions';
import {email, maxLength, required, validate} from '../../behavior/validators';
import { ValidationMessage } from './ValidationMessage';
import {useNavigate} from 'react-router-dom';

const initialValues: CreationInput = {
    name: null,
    surname: null,
    email: null,
    password: null,
    employmentType: null,
    isAdmin: null,
};

export const CreationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (values: CreationInput) => { dispatch(register(values)); navigate('/users');
    };
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="d-flex flex-wrap justify-content-center align-items-start p-4 border rounded-5">
                <Formik onSubmit={onSubmit} initialValues={initialValues} className="d-flex flex-wrap justify-content-center align-items-start p-4 border rounded-5">
                    <Form>
                        <h1 className="mt-5 mb-3">Creation Form</h1>
                        <Row>
                            <Col>
                                <Field type="text" className="form-control mb-3" placeholder="Name" name="name" validate={required}/>
                                <ValidationMessage fieldName='name'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field type="text" className="form-control mb-3" placeholder="Surname" name="surname" validate={required}/>
                                <ValidationMessage fieldName='surname'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field type="email" className="form-control mb-3" placeholder="Email" name="email" validate={validate(
                                    [
                                        { validationFunction: required },
                                        { validationFunction: email },
                                        { validationFunction: maxLength, validationAttributes: { length: 256 } }
                                    ])}/>
                                <ValidationMessage fieldName='email'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field type="password" className="form-control mb-3" placeholder="Password" name="password" validate={required}/>
                                <ValidationMessage fieldName='password'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field as="select" className="form-control mb-3" name="employmentType">
                                    <option value="">Choose the employment type</option>
                                    <option value={0}>Full time</option>
                                    <option value={1}>Part time</option>
                                </Field>
                                <ValidationMessage fieldName='employmentType'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Field type="checkbox"  name="isAdmin"/>
                                <label className="form-check-label">
                                    Is Admin
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button className="btn btn-primary w-100 mt-2" type="submit">Register</button>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
                </div>
            </Container>
        </>
    );
};