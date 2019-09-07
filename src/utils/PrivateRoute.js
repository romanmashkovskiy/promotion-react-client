import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../store';

export default ({ component: Component, ...rest }) => {
    const [state] = useStateValue();
    const { user } = state.auth;

    return (
        <Route
            { ...rest }
            render={ (props) => (
                user && user.isConfirmed
                    ? <Component { ...props } />
                    : <Redirect to={ {
                        pathname: '/',
                        state: { from: props.location }
                    } }/>
            ) }
        />
    )
};