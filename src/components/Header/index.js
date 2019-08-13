import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../store';
import { LOGOUT } from '../../store/reducers/auth';

const Container = styled.nav`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = () => {
    const [state, dispatch] = useStateValue();
    const { isAuthenticated } = state.auth;

    return (
        <Container>
            <NavLink exact to='/' activeClassName='active'>Home Page</NavLink>

            {isAuthenticated
                ?
                <>
                    <NavLink to='/dashboard' activeClassName='active'>Dashboard</NavLink>
                    <NavLink to='/add-product' activeClassName='active'>Add product</NavLink>
                </>
                :
                <>
                    <NavLink to='/login' activeClassName='active'>Login</NavLink>
                    <NavLink to='/register' activeClassName='active'>Register</NavLink>
                </>
            }

            <NavLink to='/products' activeClassName='active'>Product List</NavLink>

            {isAuthenticated && (
                <button
                    onClick={() => {
                        dispatch({ type: LOGOUT });
                        localStorage.removeItem('authToken');
                    }}
                >
                    Logout
                </button>
            )}
        </Container>
    )
};
export default Header;