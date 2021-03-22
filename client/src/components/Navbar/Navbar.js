import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import AvatarMenu from '../AvatarMenu/AvatarMenu';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('./');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            } else {
                dispatch({ type: 'AUTH', data: user });
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static"> 
                <Typography component={Link} to='/' variant="h5" className={classes.title}>TakeMeBack</Typography>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.userOptions}>
                            <Typography component={Link} to='/view_all' variant="subtitle1" className={classes.title}>View All</Typography>
                            <Typography component={Link} to='/' variant="subtitle1" className={classes.title}>Leaderboard</Typography>
                            <Typography component={Link} to='/' variant="subtitle1" className={classes.title}>Settings</Typography>
                            <AvatarMenu user={user} logout={logout}/>
                        </div>
                        
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
