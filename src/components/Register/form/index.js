import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

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
});

const RegisterForm = ({initialValues, handleSubmit}) => {
    const renderForm = (formProps) => {
        return (
            <form onSubmit={formProps.handleSubmit}>
                <Input
                    {...formProps}
                    label='User Name'
                    name='userName'
                    type='text'
                />
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
                    value='Register'
                />
            </form>
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={renderForm}
            validationSchema={RegisterSchema}
        />
    );
};

export default RegisterForm;