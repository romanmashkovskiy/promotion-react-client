import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Input from '../../../UI/Input';
import Textarea from '../../../UI/Textarea';
import Button from '../../../UI/Button';


const AddProductSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required.'),
    description: Yup.string()
        .required('Description is required.')
});

const AddProductForm = ({initialValues, handleSubmit}) => {
    const renderForm = (formProps) => {
        return (
            <form onSubmit={formProps.handleSubmit}>
                <Input
                    {...formProps}
                    label='Title'
                    name='title'
                    type='text'
                />
                <Textarea
                    {...formProps}
                    label='Description'
                    name='description'
                />
                <Button
                    {...formProps}
                    type='submit'
                    value='Add Product'
                />
            </form>
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={renderForm}
            validationSchema={AddProductSchema}
        />
    );
};

export default AddProductForm;