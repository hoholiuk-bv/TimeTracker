import type { FieldValidator } from 'formik';

export function required(value: any) {
  let error;
  if (value === null || value === undefined || !value.toString()) {
    error = 'This field is required';
  }
  return error;
}

export function email(value: any) {
  let error;

  if (required(value)) {
    return required(value);
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address format';
  }

  return error;
}

export function maxLength(value: any, { length }: MaxLengthValidatorAttributes) {
  let error;

  if (value.length > length)
    error = `This field cannot be longer than ${length}`;

  return error;
}

export function minLength(value: any, { length }: MaxLengthValidatorAttributes) {
  let error;

  if (value.length < length)
    error = `This field cannot be shorter than ${length}`;

  return error;
}

export function worktimeYear(value: any) {
  let error;

  if (value < 1900) {
    error = 'Year should be at least 1900';
  }

  return error;
}

export function confirmationPassword(value: any, { valueToCompare }: ConfirmationPassword) {
  let error;
  if (value !== valueToCompare) {
    error = 'Passwords are not equal!';
  }
  return error;
}

export function validate(validators: Validator[]): FieldValidator {
  return (value: any) => {
    let error;

    for (const validator of validators) {
      const { validationFunction, validationAttributes } = validator;
      error = validationFunction(value, validationAttributes);
      if (error)
        return error;
    }

    return error;
  };
}

type Validator = {
  validationFunction: (value: any, attribures?: any) => any;
  validationAttributes?: any;
}

type MaxLengthValidatorAttributes = {
  length: number;
}

type ConfirmationPassword = {
  valueToCompare: string;
}