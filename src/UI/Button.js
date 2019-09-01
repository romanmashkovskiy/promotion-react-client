import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonForm = ({ value, isSubmitting, handleSubmit, type }) => (
    <Button
        variant='contained'
        color='primary'
        type={ type }
        disabled={ isSubmitting }
        onClick={ handleSubmit }
    >
        { value }
    </Button>
);

export default ButtonForm;