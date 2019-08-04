import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Input from '../../../UI/Input';
import Button from '../../../UI/Button';


const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid.')
        .required('Email is required.'),
    password: Yup.string()
        .required('Password is required.')
});

const LoginForm = ({initialValues, handleSubmit}) => {
    const renderForm = (formProps) => {
        return (
            <form onSubmit={formProps.handleSubmit}>
                <Input
                    {...formProps}
                    label='Email'
                    name='email'
                    type='text'
                />
                <Input
                    {...formProps}
                    label='Password'
                    name='password'
                    type='password'
                />
                <Button
                    {...formProps}
                    type='submit'
                    value='Login'
                />
            </form>
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={renderForm}
            validationSchema={LoginSchema}
        />
    );
};

export default LoginForm;