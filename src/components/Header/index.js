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
    const { isAuthenticated, db } = state.auth;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static' color='default'>
                <Toolbar>
                    <div className={classes.links}>
                        <Typography variant='h6' className={classes.title}>
                            <NavLink to='/products/mysql' activeClassName='active'>Products MySQL</NavLink>
                        </Typography>
                        <Typography variant='h6' className={classes.title}>
                            <NavLink to='/products/mongodb' activeClassName='active'>Products MongoDB</NavLink>
                        </Typography>

                        {isAuthenticated && db === 'mysql' && (
                            <>
                                <Typography variant='h6' className={classes.title}>
                                    <NavLink to='/dashboard/mysql' activeClassName='active'>Dashboard MySQL</NavLink>
                                </Typography>
                                <Typography variant='h6' className={classes.title}>
                                    <NavLink to='/add-product/mysql' activeClassName='active'>Add product
                                        MySQL</NavLink>
                                </Typography>
                            </>
                        )}

                        {isAuthenticated && db === 'mongodb' && (
                            <>
                                <Typography variant='h6' className={classes.title}>
                                    <NavLink to='/dashboard/mongodb' activeClassName='active'>Dashboard MongoDB</NavLink>
                                </Typography>
                                <Typography variant='h6' className={classes.title}>
                                    <NavLink to='/add-product/mongodb' activeClassName='active'>Add product
                                        MongoDB</NavLink>
                                </Typography>
                            </>
                        )}
                    </div>

                    {!isAuthenticated && (
                        <>
                            <Button color='inherit'>
                                <NavLink to='/register/mysql' activeClassName='active'>Register MySQL</NavLink>
                            </Button>
                            <Button color='inherit'>
                                <NavLink to='/login/mysql' activeClassName='active'>Login MySQL</NavLink>
                            </Button>
                            <Button color='inherit'>
                                <NavLink to='/register/mongodb' activeClassName='active'>Register MongoDB</NavLink>
                            </Button>
                            <Button color='inherit'>
                                <NavLink to='/login/mongodb' activeClassName='active'>Login MongoDB</NavLink>
                            </Button>
                        </>
                    )}

                    {isAuthenticated && db === 'mysql' && (
                        <Button color='inherit'
                                onClick={() => {
                                    dispatch({ type: LOGOUT });
                                    localStorage.removeItem('authTokenMySql');
                                }}
                        >
                            Logout MySQL
                        </Button>
                    )}

                    {isAuthenticated && db === 'mongodb' && (
                        <Button color='inherit'
                                onClick={() => {
                                    dispatch({ type: LOGOUT });
                                    localStorage.removeItem('authTokenMongoDb');
                                }}
                        >
                            Logout MongoDB
                        </Button>
                    )}

                </Toolbar>
            </AppBar>
        </div>
    )
};
export default Header;