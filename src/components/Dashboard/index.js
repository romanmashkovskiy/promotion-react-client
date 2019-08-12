import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import { useStateValue } from '../../store';
import {
    GET_PRODUCTS_USER_REQUEST,
    GET_PRODUCTS_USER_SUCCESS,
    GET_PRODUCTS_USER_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE
} from '../../store/reducers/products';
import axiosClient from '../../utils/axiosConfig';

const Dashboard = ({ history }) => {
    const [state, dispatch] = useStateValue();

    const getUserProducts = async () => {
        try {
            dispatch({ type: GET_PRODUCTS_USER_REQUEST });

            const response = await axiosClient({
                method: 'get',
                url: 'my-products',
            });

            dispatch({
                type: GET_PRODUCTS_USER_SUCCESS,
                products: response.data
            });
        } catch (error) {
            console.error(error);
            dispatch({
                type: GET_PRODUCTS_USER_FAILURE,
                error
            });
        }
    };

    useEffect(() => {
        getUserProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            dispatch({ type: DELETE_PRODUCT_REQUEST });

            await axiosClient({
                method: 'delete',
                url: `my-products/${ id }`,
            });

            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
            });

            getUserProducts();
        } catch (error) {
            console.error(error);
            dispatch({
                type: DELETE_PRODUCT_FAILURE,
                error
            });
        }
    };

    const changeProduct = async (id) => {
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

            history.push('/change-product');
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
                                onClick={() => deleteProduct(product.id)}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => changeProduct(product.id)}
                            >
                                Change
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
};

export default withRouter(Dashboard);