import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../../store';
import {
    GET_PRODUCTS_LIST_REQUEST,
    GET_PRODUCTS_LIST_SUCCESS,
    GET_PRODUCTS_LIST_FAILURE,
} from '../../store/reducers/products';
import axiosClient from '../../utils/axiosConfig';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NoImage from '../../images/noimage.jpg';

const useStyles = makeStyles({
    container: {
        paddingTop: 50,
        display: 'flex',
        flexWrap: 'wrap'
    },
    card: {
        width: 300,
        marginRight: 50,
        marginBottom: 50
    },
    media: {
        height: 200,
    },
});

const ProductList = ({ history }) => {
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
    }, []);

    return (
        <Container className={classes.container}>
            {state.products.list.map(product => (
                <Card
                    className={classes.card}
                    key={product.id}
                    onClick={() => history.push(`/products/${product.id}`)}
                >
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={product.pictures[0] ? product.pictures[0].url : NoImage}
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='h2'>
                                {product.title}
                            </Typography>
                            <Typography variant='body2' color='textSecondary' component='p'>
                                {product.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}

        </Container>
    );
};

export default withRouter(ProductList);