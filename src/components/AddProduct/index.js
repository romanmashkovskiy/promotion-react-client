import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import AddProductForm from './form';
import axiosClient from '../../utils/axiosConfig';
import { useStateValue } from '../../store';

const AddProduct = ({ match, history }) => {
    const [state] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    const [changeProduct, setChangeProduct] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { currentProduct } = state.products;

    useEffect(() => {
        if (match.path === '/change-product' && currentProduct) {
            setChangeProduct(true);
        }
    }, []);

    useEffect(() => {
        if (changeProduct) {
            setTitle(currentProduct.title);
            setDescription(currentProduct.description);
        }
    }, [changeProduct]);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleAddProduct = async ({ title, description }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);

        const data = {
            title,
            description
        };

        try {
            await axiosClient({
                method: 'post',
                url: 'my-products',
                data,
            });

            history.push('/dashboard');

        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeProduct = async ({ title, description }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);

        const data = {
            title,
            description
        };

        try {
            await axiosClient({
                method: 'put',
                url: `my-products/${currentProduct.id}`,
                data,
            });

            history.push('/dashboard');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <AddProductForm
                initialValues={{ title, description }}
                handleSubmit={match.path === '/change-product' ? handleChangeProduct : handleAddProduct}
                changeProduct={changeProduct}
            />
        </Container>
    );
};

export default withRouter(AddProduct);

