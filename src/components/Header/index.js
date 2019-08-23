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
                        <NavLink to='/products/mysql' activeClassName='active'>Products MySQL</NavLink>
                    </Typography>

                    {isAuthenticated && (
                        <>
                            <Typography variant='h6' className={classes.title}>
                                <NavLink to='/dashboard/mysql' activeClassName='active'>Dashboard MySQL</NavLink>
                            </Typography>
                            <Typography variant='h6' className={classes.title}>
                                <NavLink to='/add-product/mysql' activeClassName='active'>Add product MySQL</NavLink>
                            </Typography>
                        </>
                    )}
                    </div>

                    {!isAuthenticated
                        ?
                        <>
                            <Button color='inherit'>
                                <NavLink to='/register/mysql' activeClassName='active'>Register MySQL</NavLink>
                            </Button>
                            <Button color='inherit'>
                                <NavLink to='/login/mysql' activeClassName='active'>Login MySQL</NavLink>
                            </Button>
                        </>
                        :
                        <Button color='inherit'
                                onClick={() => {
                                    dispatch({ type: LOGOUT });
                                    localStorage.removeItem('authToken');
                                }}
                        >
                            Logout MySQL
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
};
export default Header;