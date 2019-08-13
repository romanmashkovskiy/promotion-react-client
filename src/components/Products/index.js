import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Container from '../../UI/Container';
import { useStateValue } from '../../store';
import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS,
    GET_PRODUCTS_LIST_FAILURE,
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

    return (
        <Container>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Listed by</th>
                </tr>
                </thead>
                <tbody>
                { state.products.list.map(product => (
                    <tr key={ product.id }>
                        <td style={ { width: '300px' } }>{ product.id }</td>
                        <td style={ { width: '150px' } }>
                            <Link to={`/products/${product.id}`}>
                                { product.title }
                            </Link>
                        </td>
                        <td style={ { width: '150px' } }>{ product.description }</td>
                        <td style={ { width: '150px' } }>{ product.user.userName }</td>
                    </tr>
                )) }
                </tbody>
            </table>
        </Container>
    );
};

export default withRouter(ProductList);