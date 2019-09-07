import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils';
import { history } from './utils';

import Header from './components/Header';
import HomePage from './components/HomePage'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ConfirmEmail from './components/Auth/ConfirmEmail';
import ResetPassword from './components/Auth/ResetPassword';
import RestorePassword from './components/Auth/RestorePassword';
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
import { axiosClientMySql, axiosClientMongoDb, setupAxiosInterceptors } from './utils';

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
                <Route path='/email-confirm/:db' component={ ConfirmEmail }/>
                <Route path='/password-reset/:db' component={ ResetPassword }/>
                <Route path='/password-restore/:db' component={ RestorePassword }/>
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
