import React from 'react';

type Props = {
  children: string | JSX.Element | JSX.Element[];
}

export const FormGroup = ({ children }: Props) => {
  return (
    <><div className='form-group'>
      {children}
    </div></>
  );
};
