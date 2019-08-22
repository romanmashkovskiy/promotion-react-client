import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import axiosClient from '../../utils/axiosConfig';
import LoginForm from './form';
import { useStateValue } from '../../store';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../../store/reducers/auth';
import useDB from '../Hooks/useDB';

const Register = ({ history, match }) => {
    const [, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);
    const db = useDB(match.params.db);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleRegister = async ({ userName, email, password }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);

        const data = {
            userName,
            email,
            password
        };

        if (db === 'mysql') {
            try {
                dispatch({ type: REGISTER_REQUEST });

                const response = await axiosClient({
                    method: 'post',
                    url: 'auth/register',
                    data,
                });

                const { user, token } = response.data;

                localStorage.setItem('authToken', token);

                dispatch({
                    type: REGISTER_SUCCESS,
                    user
                });

                history.push('/dashboard/:mysql');

            } catch (error) {
                console.error(error);
                dispatch({
                    type: REGISTER_FAILURE,
                    error
                });
            }
        } else if (db === 'mongo') {

        }
    };

    return (
        <Container>
            <LoginForm
                initialValues={{ userName: '', email: '', password: '' }}
                handleSubmit={handleRegister}
            />
        </Container>
    );
};

export default withRouter(Register);

