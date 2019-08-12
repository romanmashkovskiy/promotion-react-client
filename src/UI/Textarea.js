import React from 'react';
import FieldError from './FieldError';
import { getIn } from 'formik';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 20px;
`;

export default ({ name, handleChange, handleBlur, values, errors, touched, type, label }) => {
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    return (
        <Wrapper>
            <div>
                <label>{label}</label>
            </div>
            <div>
                <textarea
                    name={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    autoComplete='off'
                />
            </div>
            {isTouched && error && (
                <FieldError>
                    {error}
                </FieldError>
            )}
        </Wrapper>
    );
};
