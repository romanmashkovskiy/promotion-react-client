import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

export const ToastStyles = styled.div`
    .toastContent {
        display: flex;
        align-items: center;
        justify-content: center;
        font: 14px/16px Montserrat;
    }
    
    .toastSuccess {
        border-radius: 4px;
        background-color: black;
        font: 16px Roboto;
        color: white;
        text-align: center;
    }
    
    .toastError {
        border-radius: 4px;
        background-color: red;
        font: 16px Roboto;
        color: white;
        text-align: center;
    }
`;

export default {
    success(msg, options = {}) {
        return toast.success(
            <div className='toastContent'>
                { msg }
            </div>, {
                ...options,
                className: 'toastSuccess'
            });
    },
    error(msg, options = {}) {
        return toast.error(
            <div className='toastContent'>
                { msg }
            </div>, {
                ...options,
                className: 'toastError'
            });
    }
}