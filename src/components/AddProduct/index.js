import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '../../UI/Container';
import AddProductForm from './form';
import { useStateValue } from '../../store';
import getBase64 from '../../utils/getBase64';
import getId from '../../utils/getId';
import getAxiosClient from '../../utils/getAxiosClient';

const AddProduct = ({ match: { path, params: { db } }, history }) => {
    const [state] = useStateValue();
    const [setSubmittingForm, handleSetSubmitting] = useState(null);

    const [changeProduct, setChangeProduct] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pictures, setPictures] = useState([]);

    const { currentProduct } = state.products;

    useEffect(() => {
        if (path.includes('/change-product') && currentProduct) {
            setChangeProduct(true);
        } else {
            setChangeProduct(false);
        }
    }, [currentProduct, path]);

    useEffect(() => {
        if (changeProduct && currentProduct) {
            setTitle(currentProduct.title);
            setDescription(currentProduct.description);
            setPictures(currentProduct.pictures);
        } else {
            setTitle('');
            setDescription('');
            setPictures([]);
        }
    }, [changeProduct, currentProduct]);

    useEffect(() => {
        if (setSubmittingForm) {
            setSubmittingForm(false);
        }
    }, [setSubmittingForm]);

    const handleAddProduct = async ({ title, description, pictures }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);
        const axiosClient = getAxiosClient(db);

        const promises = pictures.map(picture => getBase64(picture));
        const picturesBase64 = await Promise.all(promises);

        const data = {
            title,
            description,
            pictures: picturesBase64
        };

        try {
            await axiosClient({
                method: 'post',
                url: 'my-products',
                data,
            });

            history.push(`/dashboard/${db}`);

        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeProduct = async ({ title, description, pictures, deletedPictures }, { setSubmitting }) => {
        handleSetSubmitting(setSubmitting);
        const axiosClient = getAxiosClient(db);

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

        try {
            await axiosClient({
                method: 'put',
                url: `my-products/${ getId(db, currentProduct)}`,
                data,
            });

            history.push(`/dashboard/${db}`);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <AddProductForm
                initialValues={ { title, description, pictures, deletedPictures: [] } }
                handleSubmit={ path.includes('/change-product') ? handleChangeProduct : handleAddProduct }
                changeProduct={ changeProduct }
            />
        </Container>
    );
};

export default withRouter(AddProduct);

