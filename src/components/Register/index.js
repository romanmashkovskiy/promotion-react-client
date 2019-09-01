import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import LoginForm from './form';
import { useStateValue } from '../../store';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../../store/reducers/auth';
import getAxiosClient from '../../utils/getAxiosClient';

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

            history.push(`/dashboard/${db}`);

        } catch (error) {
            console.error(error);
            dispatch({
                type: REGISTER_FAILURE,
                error
            });
        }
    };

    return (
        <Container>
            <LoginForm
                initialValues={ { userName: '', email: '', password: '' } }
                handleSubmit={ handleRegister }
            />
        </Container>
    );
};

export default withRouter(Register);

