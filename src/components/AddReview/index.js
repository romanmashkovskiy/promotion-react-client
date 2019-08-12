import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Container from '../../UI/Container';
import AddProductForm from './form';
import axiosClient from '../../utils/axiosConfig';
import {useStateValue} from '../../store';

const AddProduct = ({match, history}) => {
    const [state] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    const {currentProduct} = state.products;

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleAddReview = async ({rating, text}, {setSubmitting}) => {
        handleSetSubmitting(setSubmitting);

        const data = {
            rating,
            text
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

    return (
        <Container>
            <AddReviewForm
                initialValues={{rating: '', text: ''}}
                handleSubmit={handleAddReview}
            />
        </Container>
    );
};

export default withRouter(AddProduct);

