import React, { useState } from 'react';
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';
import { FormGroup } from '../common/elements/FormGroup';

type Props = {
  push: (value: Date) => void;
  remove: (index: number) => void;
  values: Date[] | null;
}

export const RuleExceptionsInput = ({ push, remove, values }: Props) => {
  const [inputValue, setInputValue] = useState<Date | null>(null);
  const handleDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.valueAsDate);
  };

  const handleAddButtonClick = () => {
    if (inputValue !== null)
      push(inputValue);

    setInputValue(null);
  };

  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <>
              <FormLabel>Exceptions</FormLabel>
              <Form.Control
                onChange={handleDateInputChange}
                type="date"
                value={inputValue?.toLocaleDateString('en-CA') ?? ''}
                className="form-control date" />
            </>
          </FormGroup>
        </Col>
        <Col className='d-flex align-items-end'>
          <FormGroup>
            <Button onClick={() => handleAddButtonClick()}>Add</Button>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {values && values.map((value, index) =>
            <div className='calendarRuleException' key={index}>
              {value.toLocaleDateString('en-CA')}
              <Button variant='link' className='tag-close-btn' onClick={() => remove(index)}>x</Button>
            </div>)}
        </Col>
      </Row>
    </>
  );
};
