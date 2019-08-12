import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../store';

export default ({ component: Component, ...rest }) => {
    const [state] = useStateValue();

    return (
        <Route
            {...rest}
            render={(props) => (
                state.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}/>
            )}
        />
    )
};