import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../../../UI/Input';
import Textarea from '../../../UI/Textarea';
import Button from '../../../UI/Button';


const AddReviewSchema = Yup.object().shape({
    rating: Yup.number()
        .required('Rating is required.'),
    text: Yup.string()
        .required('Text is required.')
});

const AddProductForm = ({ initialValues, handleSubmit, changeProduct }) => {
    const renderForm = (formProps) => {
        return (
            <form onSubmit={ formProps.handleSubmit }>
                <Input
                    { ...formProps }
                    label='Rating'
                    name='rating'
                    type='number'
                />
                <Textarea
                    { ...formProps }
                    label='Text'
                    name='text'
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

export default AddProductForm;