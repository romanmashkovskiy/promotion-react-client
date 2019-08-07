import React, {useEffect} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import history from './utils/history';

import Header from './components/Header';
import HomePage from './components/HomePage'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

import {useStateValue} from './store';
import {
    FETCH_USER_REQUEST,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS
} from './store/reducers/auth';
import axiosClient from './utils/axiosConfig';

const App = () => {
    const [state, dispatch] = useStateValue();

    const {isAuthenticated} = state.auth;
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchAuthUser = async () => {
            if (!isAuthenticated && token) {
                try {
                    dispatch({type: FETCH_USER_REQUEST});

                    const response = await axiosClient({
                        method: 'get',
                        url: 'auth/me',
                    });

                    const {user} = response.data;

                    dispatch({
                        type: FETCH_USER_SUCCESS,
                        user
                    });

                    history.push('/dashboard');

                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('authToken');
                    dispatch({
                        type: FETCH_USER_FAILURE,
                        error
                    });
                }
            }
        };

        fetchAuthUser();
    }, []);

    return (
        <Router history={history}>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <PrivateRoute path='/dashboard' component={Dashboard}/>
                <PrivateRoute path='/add-product' component={AddProduct}/>
                <Route path='/product-list' component={ProductList}/>
            </Switch>
        </Router>
    );
}

export default App;
