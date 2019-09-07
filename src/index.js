import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { StateProvider } from './store';
import { initialState, rootReducer } from './store/reducers';
import { ToastStyles } from './utils/toast';

ReactDOM.render(
    <StateProvider initialState={ initialState } reducer={ rootReducer }>
        <App/>
        <ToastStyles>
            <ToastContainer
                position='top-right'
                autoClose={ 3000 }
                hideProgressBar
                newestOnTop={ false }
                closeOnClick
                rtl={ false }
                pauseOnVisibilityChange={ false }
                draggable
                pauseOnHover
            />
        </ToastStyles>
    </StateProvider>,
    document.getElementById('root'));


serviceWorker.unregister();
