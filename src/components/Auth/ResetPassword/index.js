import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ResetPasswordForm from './form';
import { getAxiosClient, toast } from '../../../utils';
import { Container } from '../../../UI';

const ResetPassword = ({ history, match: { params: { db } } }) => {
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleResetPassword = async ({ email }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);
        const axiosClient = getAxiosClient(db);

        const data = {
            email
        };

        try {
            await axiosClient({
                method: 'post',
                url: 'auth/password-reset',
                data
            });

            history.push(`/password-restore/${db}`);

        } catch (error) {
            console.error(error);
            toast.error('Check email');
        }
    };

    return (
        <Container>
            <ResetPasswordForm
                values={ { email: '' } }
                handleSubmit={ handleResetPassword }
            />
        </Container>
    );
};

export default withRouter(ResetPassword);