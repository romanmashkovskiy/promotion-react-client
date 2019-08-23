import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import LoginForm from './form';
import { axiosClientMySql } from '../../utils/axiosConfig';
import { useStateValue } from '../../store';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../../store/reducers/auth';
import useDB from '../Hooks/useDB';

const Login = ({ history, match }) => {
    const [, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);
    const db = useDB(match.params.db);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleLogin = async ({ email, password }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);

        const data = {
            email,
            password
        };

        if (db === 'mysql') {
            try {
                dispatch({ type: LOGIN_REQUEST });

                const response = await axiosClientMySql({
                    method: 'post',
                    url: 'auth/login',
                    data,
                });

                const { user, token } = response.data;

                localStorage.setItem('authTokenMySql', token);

                dispatch({
                    type: LOGIN_SUCCESS,
                    user,
                    db: 'mysql'
                });

                history.push('/dashboard/mysql');

            } catch (error) {
                console.error(error);
                dispatch({
                    type: LOGIN_FAILURE,
                    error
                });
            }
        } else {

        }
    };

    return (
        <Container>
            <LoginForm
                initialValues={{ email: '', password: '' }}
                handleSubmit={handleLogin}
            />
        </Container>
    );
};

export default withRouter(Login);

