import React from 'react'
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';



const Navbar = () => {
    const classes = useStyles();
    const user = null;

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static"> 
                <Typography component={Link} to='/' variant="h5" className={classes.title}>TakeMeBack</Typography>
                <Toolbar>
                    {user ? (
                        <div className={classes.userOptions}>
                            <List className={classes.score}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <WhatshotIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={user.result.streak} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <LocalActivityIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={user.result.points} />
                                </ListItem>
                            </List>
                            <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
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
