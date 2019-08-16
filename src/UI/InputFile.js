import React from 'react';
import styled from 'styled-components';
import { getIn } from 'formik';
import { FieldArray } from 'formik';
import FieldError from './FieldError';
import ImagePreview from './ImagePreview';

const quantityLimitOfFilesToDownload = 10;
const sizeLimitOfFilesToDownload = 15 * 1024 * 1024;

const Wrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

const StyledLabel = styled.label`
    display: block;
	cursor: pointer;
	border: 1px solid black;

	input {
		display: none;
	}
`;

const AddIcon = styled.div`
    cursor: pointer;
	position: absolute;
	top: 1px;
	right: 6px;
`;

const InputFile = ({ name, nameDeleted, values, handleBlur, touched, errors, setFieldValue }) => {
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    const onChange = event => {
        const file = event.target.files[0];

        if (
            file &&
            !values[name].find(f => f.name === file.name) &&
            file.size < sizeLimitOfFilesToDownload &&
            values[name].length < quantityLimitOfFilesToDownload
        ) {
            setFieldValue(name, value.concat(file));
        }
    };

    return (
        <FieldArray
            name={ name }
            render={ arrayHelpers => (
                <>
                    {
                        value.map((item, index) => {
                                return (
                                    <Wrapper key={ index }>
                                        <ImagePreview
                                            backgroundImage={ item }
                                            deleteImage={ () => {
                                                if (item.s3Key) {
                                                    setFieldValue(nameDeleted, values[nameDeleted].concat(item));
                                                }
                                                arrayHelpers.remove(index);
                                            } }
                                        />
                                    </Wrapper>
                                )
                            }
                        )
                    }
                    <Wrapper>
                        <StyledLabel
                            isTouched={ isTouched }
                            error={ error }
                        >
                            <input
                                type='file'
                                onChange={ onChange }
                                accept='image/*'
                                onBlur={ handleBlur }
                            />
                            <span>Choose a File</span>
                            <AddIcon>
                                <i className='fas fa-plus'/>
                            </AddIcon>
                        </StyledLabel>
                        { isTouched && error && (
                            <FieldError>
                                { error }
                            </FieldError>
                        ) }
                    </Wrapper>
                </>
            ) }
        />
    );
};

export default InputFile;