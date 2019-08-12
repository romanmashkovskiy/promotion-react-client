import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import { useStateValue } from '../../store';
import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS,
    GET_PRODUCTS_LIST_FAILURE, GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS
} from '../../store/reducers/products';
import axiosClient from '../../utils/axiosConfig';

const ProductList = ({ history }) => {
    const [state, dispatch] = useStateValue();

    useEffect(() => {
        const getProductsList = async () => {
            try {
                dispatch({ type: GET_PRODUCTS_LIST_REQUEST });

                const response = await axiosClient({
                    method: 'get',
                    url: 'products',
                });

                dispatch({
                    type: GET_PRODUCTS_LIST_SUCCESS,
                    products: response.data
                });
            } catch (error) {
                console.error(error);
                dispatch({
                    type: GET_PRODUCTS_LIST_FAILURE,
                    error
                });
            }
        };

        getProductsList();
    }, []);

    const addReview = async (id) => {
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

            history.push('/add-review');
        } catch (error) {
            console.error(error);
            dispatch({
                type: GET_PRODUCT_FAILURE,
                error
            });
        }
    };

    return (
        <Container>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Listed by</th>
                    <th>Reviews</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {state.products.list.map(product => (
                    <tr key={product.id}>
                        <td style={{ width: '300px' }}>{product.id}</td>
                        <td style={{ width: '150px' }}>{product.title}</td>
                        <td style={{ width: '150px' }}>{product.description}</td>
                        <td style={{ width: '150px' }}>{product.user.userName}</td>
                        <td style={{ width: '300px' }}>
                            <ol>
                                {product.reviews.map(review => (
                                    <li key={review.id}>
                                        <div>posted by - {review.user.userName}</div>
                                        <div>rating - {review.rating}</div>
                                        <div>text - {review.text}</div>
                                    </li>
                                ))}
                            </ol>
                        </td>
                        <td>
                            <button
                                onClick={() => addReview(product.id)}
                            >
                                Add review
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
};

export default withRouter(ProductList);