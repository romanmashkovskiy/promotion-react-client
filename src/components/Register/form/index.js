import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Input from '../../../UI/Input';
import Button from '../../../UI/Button';


const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
        .required('User Name is required.'),
    email: Yup.string()
        .email('Email is invalid.')
        .required('Email is required.'),
    password: Yup.string()
        .required('Password is required.')
        .min(6, 'No less than 6 symbols')
        .max(25, 'No more than 25 symbols'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords don\'t match.')
        .required('Password confirm is required.')
});

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const RegisterForm = ({ initialValues, handleSubmit }) => {
    const classes = useStyles();

    const renderForm = (formProps) => {
        return (
            <form onSubmit={ formProps.handleSubmit } className={ classes.container }>
                <Input
                    { ...formProps }
                    label='User Name'
                    name='userName'
                    type='text'
                />
                <Input
                    { ...formProps }
                    label='Email'
                    name='email'
                    type='text'
                />
                <Input
                    { ...formProps }
                    label='Password'
                    name='password'
                    type='password'
                />
                <Input
                    { ...formProps }
                    label='Confirm password'
                    name='confirmPassword'
                    type='password'
                />
                <Button
                    { ...formProps }
                    type='submit'
                    value='Register'
                />
            </form>
        );
    };

    return (
        <Formik
            initialValues={ initialValues }
            onSubmit={ handleSubmit }
            render={ renderForm }
            validationSchema={ RegisterSchema }
        />
    );
};

export default RegisterForm;