import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.span`
    color: red;
`;

const FieldError = ({ children }) => (
    <ErrorWrapper>
        { children }
    </ErrorWrapper>
);

export default FieldError;