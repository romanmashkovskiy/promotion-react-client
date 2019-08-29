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
import { axiosClientMySql, axiosClientMongoDb } from '../../utils/axiosConfig';
import useDB from '../Hooks/useDB';

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

const Dashboard = ({ history, match }) => {
    const [state, dispatch] = useStateValue();
    const db = useDB(match.params.db);

    const classes = useStyles();

    const axiosClient = db === 'mysql' ? axiosClientMySql : axiosClientMongoDb;

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
        if (db) {
            getUserProducts();
        }

        return () => dispatch({
            type: CLEAR_PRODUCTS_LIST
        });
    }, [db]);

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
        if (db === 'mysql') {
            try {
                dispatch({ type: GET_PRODUCT_REQUEST });

                const response = await axiosClientMySql({
                    method: 'get',
                    url: `products/${ id }`,
                });

                dispatch({
                    type: GET_PRODUCT_SUCCESS,
                    product: response.data
                });

                history.push('/change-product/mysql');
            } catch (error) {
                console.error(error);
                dispatch({
                    type: GET_PRODUCT_FAILURE,
                    error
                });
            }
        } else {

        }
    };

    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.products.list.map(product => (
                        <TableRow key={db === 'mysql' ? product.id : product._id}>
                            <TableCell>{db === 'mysql' ? product.id : product._id}</TableCell>
                            <TableCell>
                                <Link to={`/products/${db === 'mysql' ? product.id : product._id}/${db}`}>
                                    {product.title}
                                </Link>
                            </TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={classes.button}
                                    onClick={() => changeProduct(db === 'mysql' ? product.id : product._id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    className={classes.button}
                                    onClick={() => deleteProduct(db === 'mysql' ? product.id : product._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default withRouter(Dashboard);