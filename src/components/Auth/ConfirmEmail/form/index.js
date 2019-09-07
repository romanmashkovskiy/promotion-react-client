import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';
import getAxiosClient from '../../../../utils/getAxiosClient';
import { makeStyles } from '@material-ui/core/styles/index';
import toast from '../../../../utils/toast';

const ConfirmEmailSchema = Yup.object().shape({
    code: Yup.string()
        .required('Code is required.'),
});

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const ConfirmEmailForm = ({ values, handleSubmit, match: { params: { db } } }) => {
    const classes = useStyles();

    const sendConfirmEmailCode = async () => {
        const axiosClient = getAxiosClient(db);

        try {
            await axiosClient({
                method: 'post',
                url: 'auth/send-confirm-code',
            });
            toast.success('Code was sent to your email');

        } catch (error) {
            toast.error('Code wasn\'t sent to your email');
            console.error(error);
        }
    };


    const renderForm = (formProps) => {
        return (
            <form onSubmit={ formProps.handleSubmit } className={ classes.container }>
                <Input
                    { ...formProps }
                    label='Activation code'
                    name='code'
                    type='text'
                />
                <span
                    role='button'
                    onClick={ sendConfirmEmailCode }
                    style={{marginBottom: '15px', cursor: 'pointer'}}
                >
                        Send code again
                </span>
                <Button
                    { ...formProps }
                    type='submit'
                    value='Activate'
                />
            </form>
        );
    };

    return (
        <Formik
            initialValues={ values }
            onSubmit={ handleSubmit }
            render={ renderForm }
            validationSchema={ ConfirmEmailSchema }
        />
    );
};

export default withRouter(ConfirmEmailForm);