import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from './form/index';
import { useStateValue } from '../../../store/index';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../../../store/reducers/auth';
import { getAxiosClient, toast } from '../../../utils';

const Login = ({ history, match: { params: { db } } }) => {
    const [, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleLogin = async ({ email, password }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);
        const axiosClient = getAxiosClient(db);

        const data = {
            email,
            password
        };

        try {
            dispatch({ type: LOGIN_REQUEST });

            const response = await axiosClient({
                method: 'post',
                url: 'auth/login',
                data,
            });

            const { user, token } = response.data;

            localStorage.setItem(db === 'mysql' ? 'authTokenMySql' : 'authTokenMongoDb', token);

            dispatch({
                type: LOGIN_SUCCESS,
                user,
                db
            });

            history.push(`/dashboard/${db}`);

        } catch (error) {
            toast.error('Invalid email or password');
            console.error(error);
            dispatch({
                type: LOGIN_FAILURE,
                error
            });
        }
    };

    return (
        <LoginForm
            initialValues={ { email: '', password: '' } }
            handleSubmit={ handleLogin }
        />
    );
};

export default withRouter(Login);

