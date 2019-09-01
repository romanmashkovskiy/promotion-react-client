import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Input from '../../../UI/Input';
import Button from '../../../UI/Button';


const AddReviewSchema = Yup.object().shape({
    rating: Yup.number()
        .required('Rating is required.')
        .min(1, 'Ratting range is from 1 to 5')
        .max(5, 'Ratting range is from 1 to 5'),
    text: Yup.string()
        .required('Text is required.')
});

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const AddReviewForm = ({ initialValues, handleSubmit }) => {
    const classes = useStyles();

    const renderForm = (formProps) => {
        return (
            <form onSubmit={ formProps.handleSubmit } className={ classes.container }>
                <Input
                    { ...formProps }
                    label='Rating'
                    name='rating'
                    type='number'
                    min={ 1 }
                    max={ 5 }
                />
                <Input
                    { ...formProps }
                    label='Text'
                    name='text'
                    type='text'
                    multiline={ true }
                />
                <Button
                    { ...formProps }
                    type='submit'
                    value={ 'Add review' }
                />
            </form>
        );
    };

    return (
        <Formik
            initialValues={ initialValues }
            onSubmit={ handleSubmit }
            render={ renderForm }
            validationSchema={ AddReviewSchema }
        />
    );
};

export default AddReviewForm;