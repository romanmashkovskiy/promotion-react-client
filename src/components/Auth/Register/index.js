import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import RegisterForm from './form/index';
import { useStateValue } from '../../../store/index';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../../../store/reducers/auth';
import { getAxiosClient, toast } from '../../../utils';

const Register = ({ history, match: { params: { db } } }) => {
    const [, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleRegister = async ({ userName, email, password }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);
        const axiosClient = getAxiosClient(db);

        const data = {
            userName,
            email,
            password
        };

        try {
            dispatch({ type: REGISTER_REQUEST });

            const response = await axiosClient({
                method: 'post',
                url: 'auth/register',
                data,
            });

            const { user, token } = response.data;

            localStorage.setItem(db === 'mysql' ? 'authTokenMySql' : 'authTokenMongoDb', token);

            dispatch({
                type: REGISTER_SUCCESS,
                user,
                db
            });

            history.push(`/email-confirm/${db}`);

        } catch (error) {
            toast.error('Email already registered');
            console.error(error);
            dispatch({
                type: REGISTER_FAILURE,
                error
            });
        }
    };

    return (
        <RegisterForm
            initialValues={ { userName: '', email: '', password: '', confirmPassword: '' } }
            handleSubmit={ handleRegister }
        />
    );
};

export default withRouter(Register);

