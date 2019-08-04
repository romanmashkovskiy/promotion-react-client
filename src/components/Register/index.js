import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Container from '../../UI/Container';
import axiosClient from '../../utils/axiosConfig';
import LoginForm from './form';
import {useStateValue} from '../../store';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../../store/reducers/auth';

const Register = ({history}) => {
    const [, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleRegister = async ({userName, email, password}, {setSubmitting}) => {
        handleSetSubmitting(setSubmitting);

        const data = {
          userName,
          email,
          password
        };

        try {
            dispatch({type: REGISTER_REQUEST});

            const response = await axiosClient({
                method: 'post',
                url: 'auth/register',
                data,
            });

            const {user, token} = response.data;

            localStorage.setItem('authToken', token);

            dispatch({
                type: REGISTER_SUCCESS,
                user
            });

            history.push('/dashboard');

        } catch(error) {
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
                initialValues={{userName: '', email: '', password: ''}}
                handleSubmit={handleRegister}
            />
        </Container>
    );
};

export default withRouter(Register);

