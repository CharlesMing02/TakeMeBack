import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography, IconButton, Drawer, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../actions/auth';
import decode from 'jwt-decode';

import AvatarMenu from '../AvatarMenu/AvatarMenu';

const Navbar = () => {
    console.log('render')
    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [mobile, setMobile] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('./');
    };

    useEffect(() => {
        const setResponsiveness = () => {
            return (window.innerWidth < 600) ? setMobile(true) : setMobile(false);
        }
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    useEffect(() => {
        const token = user?.token;
        console.log('useffect')
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            } else {
                dispatch(refreshUser(user.result));
            }
        }
    },[location]);

    const displayMobile = () => {
        const handleDrawerOpen = () => setDrawerOpen(true);
        const handleDrawerClose = () => setDrawerOpen(false);

        return (
            <Toolbar className={classes.mobileBar}>
                <IconButton {...{edge: "start", color: "inherit", "aria-label": "menu", "aria-haspopup": "true", 
                                onClick: handleDrawerOpen}}>
                    <MenuIcon/>
                </IconButton>
                <Drawer {...{anchor: "left", open: drawerOpen, onClose: handleDrawerClose, className: classes.drawer}}>
                    <Link to='/view_all' className={classes.sidePanel}>
                        <MenuItem>View All</MenuItem>
                    </Link>
                    <Link to='/leaderboard' className={classes.sidePanel}>
                        <MenuItem>Leaderboard</MenuItem>
                    </Link>
                    <Link to='/' color="inherit" className={classes.sidePanel}>
                        <MenuItem>Settings</MenuItem>
                    </Link>
                </Drawer>
                <Typography component={Link} to='/' variant="h5" className={classes.title}>TakeMeBack</Typography>
                <div style={{marginLeft: 'auto'}}>
                    <AvatarMenu user={user} logout={logout}/>
                </div>
            </Toolbar>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static"> 
                {mobile ? displayMobile() : (
                    <>
                        <Typography component={Link} to='/' variant="h5" className={classes.title}>TakeMeBack</Typography>
                        <Toolbar className={classes.toolbar}>
                            {user ? (
                                <div className={classes.userOptions}>
                                    <Typography component={Link} to='/view_all' variant="subtitle1" className={classes.title}>View All</Typography>
                                    <Typography component={Link} to='/leaderboard' variant="subtitle1" className={classes.title}>Leaderboard</Typography>
                                    <Typography component={Link} to='/' variant="subtitle1" className={classes.title}>Settings</Typography>
                                    <AvatarMenu user={user} logout={logout}/>
                                </div>
                                
                            ) : (
                                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                            )}
                        </Toolbar>
                    </>
                )}
            </AppBar>
        </div>
    )
}

export default Navbar
