import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import AddReviewForm from './form';
import axiosClient from '../../utils/axiosConfig';
import { useStateValue } from '../../store';
import { GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from '../../store/reducers/products';

const ProductPage = ({ match }) => {
    const [state, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    const { currentProduct } = state.products;
    const { isAuthenticated } = state.auth;

    const { id } = match.params;

    useEffect(() => {
        const getProduct = async (id) => {
            try {
                dispatch({ type: GET_PRODUCT_REQUEST });

                const response = await axiosClient({
                    method: 'get',
                    url: `products/${ id }`,
                });

                dispatch({
                    type: GET_PRODUCT_SUCCESS,
                    product: response.data
                });

            } catch (error) {
                console.error(error);
                dispatch({
                    type: GET_PRODUCT_FAILURE,
                    error
                });
            }
        };

        getProduct(id);
    }, [id]);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleAddReview = async ({ rating, text }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);

        const data = {
            rating,
            text
        };

        try {
            await axiosClient({
                method: 'post',
                url: `/products/${ id }/add-review`,
                data,
            });

        } catch (error) {
            console.error(error);
        }
    };

    if (currentProduct) {
        return (
            <Container>
                <div style={ { marginBottom: '50px' } }>
                    <p>title: { currentProduct.title }</p>
                    <p>description: { currentProduct.description }</p>
                    <p>reviews:</p>
                    <ol>
                        { currentProduct.reviews.map(review => (
                            <li key={ review.id }>
                                <div>posted by - { review.user.userName }</div>
                                <div>rating - { review.rating }</div>
                                <div>text - { review.text }</div>
                            </li>
                        )) }
                    </ol>
                </div>
                { isAuthenticated && (
                    <AddReviewForm
                        initialValues={ { rating: '', text: '' } }
                        handleSubmit={ handleAddReview }
                    />
                ) }
            </Container>
        );
    }

    return (
        <Container>
            <div>
                No such product
            </div>
        </Container>
    );

};

export default withRouter(ProductPage);