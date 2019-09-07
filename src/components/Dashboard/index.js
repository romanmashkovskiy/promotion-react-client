import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    GET_PRODUCT_FAILURE,
    CLEAR_PRODUCTS_LIST
} from '../../store/reducers/products';
import { getId, getAxiosClient } from '../../utils';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        marginTop: 0,
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    button: {
        marginRight: 20
    }
});

const Dashboard = ({ history, match: { params: { db } } }) => {
    const [state, dispatch] = useStateValue();

    const classes = useStyles();

    const getUserProducts = async () => {
        const axiosClient = getAxiosClient(db);

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
        if (db) {
            getUserProducts();
        }

        return () => dispatch({
            type: CLEAR_PRODUCTS_LIST
        });
    }, [db]);

    const deleteProduct = async (id) => {
        const axiosClient = getAxiosClient(db);

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
        const axiosClient = getAxiosClient(db);

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

            history.push(`/change-product/${db}`);
        } catch (error) {
            console.error(error);
            dispatch({
                type: GET_PRODUCT_FAILURE,
                error
            });
        }
    };

    return (
        <div className={ classes.root }>
            <Table className={ classes.table }>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { state.products.list.map(product => {
                        const productId = getId(db, product);

                        return (
                            <TableRow key={ productId }>
                                <TableCell>{ productId }</TableCell>
                                <TableCell>
                                    <Link to={ `/products/${productId}/${db}` }>
                                        { product.title }
                                    </Link>
                                </TableCell>
                                <TableCell>{ product.description }</TableCell>
                                <TableCell>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className={ classes.button }
                                        onClick={ () => changeProduct(productId) }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        className={ classes.button }
                                        onClick={ () => deleteProduct(productId) }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    }) }
                </TableBody>
            </Table>
        </div>
    );
};

export default withRouter(Dashboard);