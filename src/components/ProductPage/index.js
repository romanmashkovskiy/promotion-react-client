import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import AddReviewForm from './form';
import axiosClient from '../../utils/axiosConfig';
import { useStateValue } from '../../store';
import {
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS
} from '../../store/reducers/products';
import ProductPicture from '../../UI/ProductPicture';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        marginBottom: 20
    },
    gridList: {
        width: 320,
        height: 300,
    },
}));

const ProductPage = ({ match }) => {
    const [state, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    const { currentProduct } = state.products;
    const { isAuthenticated } = state.auth;

    const { id } = match.params;

    const classes = useStyles();

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

    useEffect(() => {
        getProduct(id);
    }, [id]);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleAddReview = async ({ rating, text }, { setSubmitting, resetForm }) => {
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
            getProduct(id);
            resetForm();

        } catch (error) {
            console.error(error);
        }
    };

    if (currentProduct) {
        return (
            <Container>
                <div style={{ marginBottom: '50px' }}>
                    <Typography variant="h4" gutterBottom>
                        title: {currentProduct.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        description: {currentProduct.description}
                    </Typography>

                    <div className={classes.root}>
                        <GridList cellHeight={300} className={classes.gridList} cols={1}>
                            {currentProduct.pictures.map(picture => (
                                <GridListTile key={picture.name} cols={1}>
                                    <ProductPicture
                                        picture={picture}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>


                    <p>reviews:</p>
                    <ol>
                        {currentProduct.reviews.map(review => (
                            <li key={review.id}>
                                <div>posted by - {review.user.userName}</div>
                                <div>rating - {review.rating}</div>
                                <div>text - {review.text}</div>
                            </li>
                        ))}
                    </ol>
                </div>
                {isAuthenticated && (
                    <AddReviewForm
                        initialValues={{ rating: '', text: '' }}
                        handleSubmit={handleAddReview}
                    />
                )}
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