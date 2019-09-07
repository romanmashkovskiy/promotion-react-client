import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from '../store';

export default ({ component: Component, ...rest }) => {
    const [state] = useStateValue();
    const { user } = state.auth;

    return (
        <Route
            { ...rest }
            render={ (props) => {
                console.log(props);

                if (user && user.isConfirmed) {
                    return <Component { ...props } />;
                } else if (user && !user.isConfirmed) {
                    return <Redirect to={ {
                        pathname: `/email-confirm/${props.match.params.db}`,
                        state: { from: props.location }
                    } }/>
                } else {
                    return <Redirect to={ {
                        pathname: '/',
                        state: { from: props.location }
                    } }/>
                }
            } }
        />
    )
};