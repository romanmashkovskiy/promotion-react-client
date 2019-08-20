import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../store';
import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS,
    GET_PRODUCTS_LIST_FAILURE,
} from '../../store/reducers/products';
import axiosClient from '../../utils/axiosConfig';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: 0,
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

const ProductList = () => {
    const [state, dispatch] = useStateValue();

    const classes = useStyles();

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
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Listed by</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.products.list.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>
                                <Link to={`/products/${product.id}`}>
                                    {product.title}
                                </Link>
                            </TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.user.userName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProductList;