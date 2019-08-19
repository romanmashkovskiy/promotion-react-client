import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../store';
import { LOGOUT } from '../../store/reducers/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    links: {
        display: 'flex',
        flexDirection: 'row',

        flexGrow: 1,
    },
    title: {
        marginRight: 15,
    },
}));

const Header = () => {
    const [state, dispatch] = useStateValue();
    const { isAuthenticated } = state.auth;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static' color='default'>
                <Toolbar>
                    <div className={classes.links}>
                    <Typography variant='h6' className={classes.title}>
                        <NavLink to='/products' activeClassName='active'>Products</NavLink>
                    </Typography>

                    {isAuthenticated && (
                        <>
                            <Typography variant='h6' className={classes.title}>
                                <NavLink to='/dashboard' activeClassName='active'>Dashboard</NavLink>
                            </Typography>
                            <Typography variant='h6' className={classes.title}>
                                <NavLink to='/add-product' activeClassName='active'>Add product</NavLink>
                            </Typography>
                        </>
                    )}
                    </div>

                    {!isAuthenticated
                        ?
                        <>
                            <Button color='inherit'>
                                <NavLink to='/register' activeClassName='active'>Register</NavLink>
                            </Button>
                            <Button color='inherit'>
                                <NavLink to='/login' activeClassName='active'>Login</NavLink>
                            </Button>
                        </>
                        :
                        <Button color='inherit'
                                onClick={() => {
                                    dispatch({ type: LOGOUT });
                                    localStorage.removeItem('authToken');
                                }}
                        >
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
};
export default Header;