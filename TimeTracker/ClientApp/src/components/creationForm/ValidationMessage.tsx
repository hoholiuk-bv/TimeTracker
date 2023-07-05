import React from 'react';
import { useFormikContext, getIn } from 'formik';

type Props = {
    fieldName: string;
}

export const ValidationMessage = ({ fieldName }: Props) => {
    const formik = useFormikContext();
    const errorMessage = getIn(formik.errors, fieldName);
    const touched = getIn(formik.touched, fieldName);

    return (
        <>
            {errorMessage && touched && <span className="field-validation-error">{errorMessage}</span>}
        </>
    );
};