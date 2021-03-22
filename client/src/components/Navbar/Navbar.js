import React from 'react'
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

import AvatarMenu from '../AvatarMenu/AvatarMenu';

const Navbar = () => {
    const classes = useStyles();
    const user = {
        result: {
            streak: '1',
            points: '1900',
            name: 'Charles'
        }
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static"> 
                <Typography component={Link} to='/' variant="h5" className={classes.title}>TakeMeBack</Typography>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.userOptions}>
                            <Typography component={Link} to='/' variant="h7" className={classes.title}>View All</Typography>
                            <Typography component={Link} to='/' variant="h7" className={classes.title}>Leaderboard</Typography>
                            <Typography component={Link} to='/' variant="h7" className={classes.title}>Settings</Typography>
                            <AvatarMenu user={user}/>
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
