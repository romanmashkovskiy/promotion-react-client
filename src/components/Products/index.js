import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useStateValue } from '../../store';
import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS,
    GET_PRODUCTS_LIST_FAILURE,
    CLEAR_PRODUCTS_LIST,
} from '../../store/reducers/products';
import { axiosClientMySql } from '../../utils/axiosConfig';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useDB from '../Hooks/useDB';

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

const ProductList = ({ match }) => {
    const [state, dispatch] = useStateValue();
    const db = useDB(match.params.db);

    const classes = useStyles();

    useEffect(() => {
        const getProductsList = async () => {
            if (db === 'mysql') {
                try {
                    dispatch({ type: GET_PRODUCTS_LIST_REQUEST });

                    const response = await axiosClientMySql({
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
            } else {

            }
        };
        getProductsList();

        return () => dispatch({
            type: CLEAR_PRODUCTS_LIST
        });
    }, [db, dispatch]);

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
                                <Link to={`/products/${product.id}/${db}`}>
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

export default withRouter(ProductList);