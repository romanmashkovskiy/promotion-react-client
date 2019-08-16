import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    width: 150px;
	height: 150px;
	
    .image {
        position: absolute;
        top: 0;
        left: 0;
	    height: 100%;
	    width: 100%;
	    object-fit: cover; 
    }
`;

const ImageRemove = styled.div`
    position: absolute;
	top: 2px;
	right: 2px;
	z-index: 5;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	width: 24px;
	height: 24px;
`;

const ImagePreview = ({ backgroundImage, deleteImage }) => {
    const [thumb, setThumb] = useState(null);

    useEffect(() => {
        if (backgroundImage.s3Key) {
            setThumb(backgroundImage.url);
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(backgroundImage);
            reader.onloadend = () => {
                setThumb(reader.result);
            };
        }
    }, []);

    return (
        <Wrapper>
            <img
                className='image'
                src={ thumb }
                alt='preview'
            />
            <ImageRemove onClick={ deleteImage }>
                <i className='far fa-trash-alt'/>
            </ImageRemove>
        </Wrapper>
    );
}

export default ImagePreview;