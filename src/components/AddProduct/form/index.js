import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input from '../../../UI/Input';
import InputFile from '../../../UI/InputFile';
import Textarea from '../../../UI/Textarea';
import Button from '../../../UI/Button';


const AddProductSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required.'),
    description: Yup.string()
        .required('Description is required.'),
    pictures: Yup.array()
        .required('Picture is required')
        .min(1, 'Minimum 1 picture'),
});

const AddProductForm = ({ initialValues, handleSubmit, changeProduct }) => {
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
                <InputFile
                    {...formProps}
                    name='pictures'
                    nameDeleted='deletedPictures'
                />
                <Button
                    {...formProps}
                    type='submit'
                    value={changeProduct ? 'Save changes' : 'Add Product'}
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
            enableReinitialize={true}
        />
    );
};

export default AddProductForm;