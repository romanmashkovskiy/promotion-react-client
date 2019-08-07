import React, {useEffect} from 'react';
import Container from '../../UI/Container';
import {useStateValue} from '../../store';
import {
    GET_PRODUCTS_USER_REQUEST,
    GET_PRODUCTS_USER_SUCCESS,
    GET_PRODUCTS_USER_FAILURE
} from '../../store/reducers/products';
import axiosClient from '../../utils/axiosConfig';

const Dashboard = () => {
    const [state, dispatch] = useStateValue();

    useEffect(() => {
        const getUserProducts = async () => {
            try {
                dispatch({type: GET_PRODUCTS_USER_REQUEST});

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

        getUserProducts();
    }, []);

    return (
        <Container>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {state.products.list.map(product => (
                    <tr key={product.id}>
                        <td style={{width: '100px'}}>{product.id}</td>
                        <td style={{width: '100px'}}>{product.title}</td>
                        <td style={{width: '100px'}}>{product.description}</td>
                        <td>
                            <button>Delete</button>
                            <button>Change</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
};

export default Dashboard;