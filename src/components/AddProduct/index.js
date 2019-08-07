import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Container from '../../UI/Container';
import AddProductForm from './form';
import axiosClient from '../../utils/axiosConfig';
import {useStateValue} from '../../store';
import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE
} from '../../store/reducers/products';

const AddProduct = ({history}) => {
    const [, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleAddProduct = async ({title, description}, {setSubmitting}) => {
        handleSetSubmitting(setSubmitting);

        const data = {
            title,
            description
        };

        try {
            dispatch({type: ADD_PRODUCT_REQUEST});

            await axiosClient({
                method: 'post',
                url: 'my-products',
                data,
            });

            dispatch({
                type: ADD_PRODUCT_SUCCESS,
            });

            history.push('/dashboard');

        } catch (error) {
            console.error(error);
            dispatch({
                type: ADD_PRODUCT_FAILURE,
                error
            });
        }
    };

    return (
        <Container>
            <AddProductForm
                initialValues={{title: '', description: ''}}
                handleSubmit={handleAddProduct}
            />
        </Container>
    );
};

export default withRouter(AddProduct);

