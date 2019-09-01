import React from 'react';
import { getIn } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(() => ({
    formControl: {
        marginBottom: 20,
    },
    error: {
        color: 'red'
    }
}));

const InputForm = ({
                       name,
                       handleChange,
                       handleBlur,
                       values,
                       errors,
                       touched,
                       type,
                       label,
                       multiline,
                       min,
                       max
                   }) => {
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    const classes = useStyles();

    return (
        <FormControl className={ classes.formControl }>
            <InputLabel htmlFor={ name }>
                { label }
            </InputLabel>
            <Input
                id={ name }
                name={ name }
                onChange={ handleChange }
                onBlur={ handleBlur }
                value={ value }
                autoComplete='off'
                type={ type }
                multiline={ multiline }
                rows={ 6 }
                inputProps={ { min, max } }
            />
            { isTouched && error && (
                <FormHelperText className={ classes.error }>
                    { error }
                </FormHelperText>
            ) }
        </FormControl>
    );
};

export default InputForm;