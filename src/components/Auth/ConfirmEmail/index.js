import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ConfirmEmailForm from './form/index';
import { useStateValue } from '../../../store/index';
import { getAxiosClient, toast } from '../../../utils';
import {
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAILURE
} from '../../../store/reducers/auth';

const ConfirmEmail = ({ history, match: { params: { db } } }) => {
    const [state, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    const { isAuthenticated } = state.auth;

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleConfirmEmail = async ({ code }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);
        const axiosClient = getAxiosClient(db);

        const data = {
            code
        };

        try {
            dispatch({ type: CONFIRM_EMAIL_REQUEST });

            const response = await axiosClient({
                method: 'post',
                url: 'auth/email-confirm',
                data,
            });

            const { user } = response.data;

            dispatch({
                type: CONFIRM_EMAIL_SUCCESS,
                user,
            });

            history.push(`/dashboard/${db}`);

        } catch (error) {
            toast.error('Check code');
            console.error(error);
            dispatch({
                type: CONFIRM_EMAIL_FAILURE,
                error
            });
        }
    };

    return (
        <ConfirmEmailForm
            values={ { code: '' } }
            handleSubmit={ handleConfirmEmail }
        />
    );
};

export default withRouter(ConfirmEmail);