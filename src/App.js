import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import history from './utils/history';

import Header from './components/Header';
import HomePage from './components/HomePage'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import ProductPage from './components/ProductPage';

import { useStateValue } from './store';
import {
    FETCH_USER_REQUEST,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS, LOGOUT
} from './store/reducers/auth';
import { axiosClientMySql, axiosClientMongoDb } from './utils/axiosConfig';

import { setupAxiosInterceptors } from './utils/axiosConfig';

const App = () => {
    const [state, dispatch] = useStateValue();

    setupAxiosInterceptors(dispatch);

    const { isAuthenticated } = state.auth;
    const tokenMySql = localStorage.getItem('authTokenMySql');
    const tokenMongoDb = localStorage.getItem('authTokenMongoDb');

    useEffect(() => {
        const fetchAuthUser = async () => {
            if (!isAuthenticated && (tokenMySql || tokenMongoDb)) {
                const axiosClient = tokenMySql ? axiosClientMySql : axiosClientMongoDb;

                try {
                    dispatch({ type: FETCH_USER_REQUEST });

                    const response = await axiosClient({
                        method: 'get',
                        url: 'auth/me',
                    });

                    const { user } = response.data;

                    dispatch({
                        type: FETCH_USER_SUCCESS,
                        user,
                        db: tokenMySql ? 'mysql' : 'mongodb'
                    });

                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('authTokenMySql');
                    localStorage.removeItem('authTokenMongoDb');
                    dispatch({
                        type: FETCH_USER_FAILURE,
                        error
                    });
                    dispatch({ type: LOGOUT });
                }
            }
        };

        fetchAuthUser();
    }, [dispatch, tokenMySql, tokenMongoDb, isAuthenticated]);

    return (
        <Router history={ history }>
            <Header/>
            <Switch>
                <Route exact path='/' component={ HomePage }/>
                <Route path='/login/:db' component={ Login }/>
                <Route path='/register/:db' component={ Register }/>
                <PrivateRoute path='/dashboard/:db' component={ Dashboard }/>
                <PrivateRoute path='/add-product/:db' component={ AddProduct }/>
                <Route exact path='/products/:db' component={ Products }/>
                <PrivateRoute path='/change-product/:db' component={ AddProduct }/>
                <Route path='/products/:id/:db' component={ ProductPage }/>
            </Switch>
        </Router>
    );
};

export default App;
