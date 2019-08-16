import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;
    width: 300px;
	height: 300px;
	
    .image {
        position: absolute;
        top: 0;
        left: 0;
	    height: 100%;
	    width: 100%;
	    object-fit: cover; 
    }
`;

const ProductPicture = ({ picture }) => {
    return (
        <Wrapper>
            <img
                className='image'
                src={ picture.url }
                alt='product'
            />
        </Wrapper>
    );
};

export default ProductPicture;