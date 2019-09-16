import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AddReviewForm from './form';
import { getId } from '../../utils';
import { useStateValue } from '../../store';
import {
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
} from '../../store/reducers/products';
import { ProductPicture } from '../../UI';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AvatarPlaceholder from '../../images/avatar.png';
import { getAxiosClient } from '../../utils';

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
    reviews: {
        width: 320
    }
}));

const ProductPage = ({ match: { params: { db, id } } }) => {
    const [state, dispatch] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    const { currentProduct } = state.products;
    const { isAuthenticated, db: dbStore } = state.auth;

    const classes = useStyles();

    const getProduct = async (id) => {
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
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, db]);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleAddReview = async ({ rating, text }, { setSubmitting, resetForm }) => {
        handleSetSubmitting(setSubmitting);
        const axiosClient = getAxiosClient(db);

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
            <>
                <div style={ { marginBottom: '50px' } }>
                    <Typography variant='h4' gutterBottom>
                        title: { currentProduct.title }
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        description: { currentProduct.description }
                    </Typography>

                    { currentProduct.pictures.length > 0 && (
                        <div className={ classes.root }>
                            <GridList cellHeight={ 300 } className={ classes.gridList } cols={ 1 }>
                                { currentProduct.pictures.map(picture => (
                                    <GridListTile key={ picture.name } cols={ 1 }>
                                        <ProductPicture
                                            picture={ picture }
                                        />
                                    </GridListTile>
                                )) }
                            </GridList>
                        </div>
                    ) }

                    <div className={ classes.reviews }>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={ <i className='fas fa-chevron-down'/> }
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                            >
                                <Typography>Reviews</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                { currentProduct.reviews.length > 0
                                    ?
                                    <ol>
                                        { currentProduct.reviews.map(review => (
                                            <List key={ getId(db, review) }
                                                  className={ classes.root }>
                                                <ListItem alignItems='flex-start'>
                                                    <ListItemAvatar>
                                                        <Avatar alt='user avatar' src={ AvatarPlaceholder }/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={ `Rating - ${review.rating}` }
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component='span'
                                                                    variant='body2'
                                                                    className={ classes.inline }
                                                                    color='textPrimary'
                                                                >
                                                                    { review.user.userName }
                                                                </Typography>
                                                                { ` - ${review.text}` }
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant='inset' component='li'/>
                                            </List>
                                        )) }
                                    </ol>
                                    :
                                    <Typography>No reviews</Typography>
                                }

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>

                </div>
                { isAuthenticated && dbStore === db && (
                    <AddReviewForm
                        initialValues={ { rating: '', text: '' } }
                        handleSubmit={ handleAddReview }
                    />
                ) }
            </>
        );
    }

    return (
        <div>
            No such product
        </div>
    );

};

export default withRouter(ProductPage);