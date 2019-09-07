import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import RestorePasswordForm from './form';
import { useStateValue } from '../../../store';
import { getAxiosClient, toast } from '../../../utils';
import {
    RESTORE_PASSWORD_FAILURE,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS
} from '../../../store/reducers/auth';

const RestorePassword = ({ history, match: { params: { db } } }) => {
    const [, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleRestorePassword = async ({ email, password, code }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);
        const axiosClient = getAxiosClient(db);

        const data = {
            email,
            password,
            code
        };

        try {
            dispatch({ type: RESTORE_PASSWORD_REQUEST });

            const response = await axiosClient({
                method: 'post',
                url: 'auth/password-restore',
                data,
            });

            const { user, token } = response.data;

            localStorage.setItem(db === 'mysql' ? 'authTokenMySql' : 'authTokenMongoDb', token);

            dispatch({
                type: RESTORE_PASSWORD_SUCCESS,
                user,
                db
            });

            if (user.isConfirmed) {
                history.push(`/dashboard/${db}`);
            } else {
                history.push(`/email-confirm/${db}`);
            }

        } catch (error) {
            console.error(error);
            toast.error('Check email or code');
            dispatch({
                type: RESTORE_PASSWORD_FAILURE,
                error
            });
        }
    };

    return (
        <RestorePasswordForm
            values={ { email: '', password: '', confirmPassword: '', code: '' } }
            handleSubmit={ handleRestorePassword }
        />
    );
};

export default withRouter(RestorePassword);


