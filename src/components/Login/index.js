import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import LoginForm from './form';
import { axiosClientMySql, axiosClientMongoDb } from '../../utils/axiosConfig';
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

        const axiosClient = db === 'mysql' ? axiosClientMySql : axiosClientMongoDb;

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
            console.error(error);
            dispatch({
                type: LOGIN_FAILURE,
                error
            });
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

