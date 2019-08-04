import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import history from './utils/history';

import Header from './components/Header';
import HomePage from './components/HomePage'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

function App() {
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
