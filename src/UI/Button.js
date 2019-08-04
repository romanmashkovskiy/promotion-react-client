import React from 'react';

const Button = ({value, isSubmitting, handleSubmit, type}) => (
    <button
        type={type}
        disabled={isSubmitting}
        onClick={handleSubmit}
    >
        {value}
    </button>
);

export default Button;