import { Field, Form as FormikForm, Formik } from 'formik';
import React from 'react';
import { Col, Container, FormCheck, FormLabel, InputGroup, Row } from 'react-bootstrap';
import { FormGroup } from '../common/elements/FormGroup';
import Form from 'react-bootstrap/Form';

export const RuleForm = () => {
  return (
    <>
      <Formik initialValues={{}} onSubmit={() => console.log(1)}>
        <FormikForm>
          <Container>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Title</FormLabel>
                  <Field
                    type="text"
                    className="form-control date"
                    name="email" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Date</FormLabel>
                  <Field
                    type="date"
                    className="form-control date"
                    name="email" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Type</FormLabel>
                  <Form.Select>
                    <option value="1">Non-working day</option>
                    <option value="2">Short day</option>
                  </Form.Select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Title</FormLabel>
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    id="custom-switch"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>

                  <Field
                    type="number"
                    className="form-control date"
                    name="frequency"/>
                </FormGroup>
              </Col>
              <Col>
                <Form.Select>
                  <option value="1">Day</option>
                  <option value="2">Week</option>
                  <option value="3">Month</option>
                  <option value="4">Year</option>
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </FormikForm>
      </Formik >
    </>
  );
};
