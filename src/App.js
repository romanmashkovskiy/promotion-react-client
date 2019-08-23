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
import axiosClientMySql from './utils/axiosConfig';

const App = () => {
    const [state, dispatch] = useStateValue();

    const { isAuthenticated } = state.auth;
    const tokenMySql = localStorage.getItem('authTokenMySql');
    const tokenMongoDb = localStorage.getItem('authTokenMongoDb');

    useEffect(() => {
        const fetchAuthUser = async () => {
            if (!isAuthenticated && tokenMySql) {
                try {
                    dispatch({ type: FETCH_USER_REQUEST });

                    const response = await axiosClientMySql({
                        method: 'get',
                        url: 'auth/me',
                    });

                    const { user } = response.data;

                    dispatch({
                        type: FETCH_USER_SUCCESS,
                        user,
                        db: 'mysql'
                    });

                    history.push('/dashboard/mysql');

                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('authTokenMySql');
                    dispatch({
                        type: FETCH_USER_FAILURE,
                        error
                    });
                    dispatch({ type: LOGOUT });
                }
            } else if ((!isAuthenticated && tokenMongoDb)) {

            }
        };

        fetchAuthUser();
    }, [dispatch, tokenMySql, tokenMongoDb, isAuthenticated]);

    return (
        <Router history={history}>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/login/:db' component={Login}/>
                <Route path='/register/:db' component={Register}/>
                <PrivateRoute path='/dashboard/:db' component={Dashboard}/>
                <PrivateRoute path='/add-product/:db' component={AddProduct}/>
                <Route exact path='/products/:db' component={Products}/>
                <PrivateRoute path='/change-product/:db' component={AddProduct}/>
                <Route path='/products/:id/:db' component={ProductPage}/>
            </Switch>
        </Router>
    );
}

export default App;
