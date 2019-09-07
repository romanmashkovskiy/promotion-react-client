import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Input, Button } from '../../../../UI';
import { makeStyles } from '@material-ui/core/styles';

const RestorePasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid.')
        .required('Email is required.'),
    password: Yup.string()
        .required('Password is required.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords don\'t match.')
        .required('Password confirm is required.'),
    code: Yup.string()
        .required('Code is required.'),
});

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const RestorePasswordForm = ({ values, handleSubmit, match: { params: { db } } }) => {
    const classes = useStyles();

    const renderForm = (formProps) => {
        return (
            <form onSubmit={ formProps.handleSubmit } className={ classes.container }>
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
                <Input
                    { ...formProps }
                    label='Reset code'
                    name='code'
                    type='text'
                />
                <Button
                    { ...formProps }
                    type='submit'
                    value='Restore password'
                />
                <NavLink
                    to={ `/login/${db}` }
                    style={ { marginTop: '15px' } }
                >
                    or login
                </NavLink>
            </form>
        );
    };

    return (
        <Formik
            initialValues={ values }
            onSubmit={ handleSubmit }
            render={ renderForm }
            validationSchema={ RestorePasswordSchema }
        />
    );
};

export default withRouter(RestorePasswordForm);