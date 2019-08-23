import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import AddProductForm from './form';
import axiosClient from '../../utils/axiosConfig';
import { useStateValue } from '../../store';
import getBase64 from '../../utils/getBase64';
import useDB from '../Hooks/useDB';

const AddProduct = ({ match, history }) => {
    const [state] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    const [changeProduct, setChangeProduct] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pictures, setPictures] = useState([]);
    const db = useDB(match.params.db);

    const { currentProduct } = state.products;

    useEffect(() => {
        if (match.path.includes('/change-product') && currentProduct) {
            setChangeProduct(true);
        }
    }, [currentProduct, match.path]);

    useEffect(() => {
        if (changeProduct) {
            setTitle(currentProduct.title);
            setDescription(currentProduct.description);
            setPictures(currentProduct.pictures);
        }
    }, [changeProduct, currentProduct]);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleAddProduct = async ({ title, description, pictures }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);

        const promises = pictures.map(picture => getBase64(picture));
        const picturesBase64 = await Promise.all(promises);

        const data = {
            title,
            description,
            pictures: picturesBase64
        };

        if (db === 'mysql') {
            try {
                await axiosClient({
                    method: 'post',
                    url: 'my-products',
                    data,
                });

                history.push('/dashboard/mysql');

            } catch (error) {
                console.error(error);
            }
        } else {

        }
    };

    const handleChangeProduct = async ({ title, description, pictures, deletedPictures }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);

        const promises = [];
        pictures.forEach(picture => {
            if (!picture.s3Key) {
                promises.push(getBase64(picture));
            }
        });

        const picturesBase64 = await Promise.all(promises);

        const data = {
            title,
            description,
            pictures: picturesBase64,
            deletedPictures
        };

        if (db === 'mysql') {
            try {
                await axiosClient({
                    method: 'put',
                    url: `my-products/${ currentProduct.id }`,
                    data,
                });

                history.push('/dashboard/mysql');

            } catch (error) {
                console.error(error);
            }
        } else {

        }
    };

    return (
        <Container>
            <AddProductForm
                initialValues={{ title, description, pictures, deletedPictures: [] }}
                handleSubmit={match.path.includes('/change-product') ? handleChangeProduct : handleAddProduct}
                changeProduct={changeProduct}
            />
        </Container>
    );
};

export default withRouter(AddProduct);

