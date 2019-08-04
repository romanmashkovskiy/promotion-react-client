import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {StateProvider} from './store';
import {initialState, rootReducer} from './store/reducers';
import {setupAxiosInterceptors} from './utils/axiosConfig';

setupAxiosInterceptors();

ReactDOM.render(
    <StateProvider initialState={initialState} reducer={rootReducer}>
        <App/>
    </StateProvider>,
    document.getElementById('root'));


serviceWorker.unregister();
