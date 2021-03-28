import React from 'react'
import { Container, Grow, Switch, FormControlLabel, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListSubheader, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { updateUser } from '../../actions/auth';


const Settings = () => {
    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData.result);
    const dispatch = useDispatch();
    const history = useHistory();

    const toggleAutoplay = (e) => {
        console.log({...user.settings, autoplay: e.target.checked});
        dispatch(updateUser(user._id, { settings: {...user.settings, autoplay: e.target.checked} }));
    }

    const changeTheme = async (theme) => {
        await dispatch(updateUser(user._id, { settings: {...user.settings, theme: theme} }));
        history.push('./settings');
    }

    return (
        <Grow in>
            <Container className={classes.main} maxWidth={false}>
                <Typography variant="h5" className={classes.title}>{user.name}'s Account</Typography>
                <List aria-label="themes" subheader={<ListSubheader color='primary'>Media</ListSubheader>} className={classes.section}>
                    <ListItem >
                        <FormControlLabel
                            control={<Switch checked={user.settings.autoplay} onChange={toggleAutoplay} color="primary" name="checkedA"/>}
                            label="Autoplay music"
                        />
                    </ListItem>
                </List>
                
                <List aria-label="themes" subheader={<ListSubheader color='primary'>Palette</ListSubheader>} className={classes.section}>
                    <ListItem
                        button
                        selected={user.settings.theme === 'default'}
                        onClick={() => changeTheme('default')}
                    >
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#4169E1'}} variant='square'>{''}</Avatar>
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#ffcba4'}} variant='square'>{''}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Blue Peach" secondary="Default"/>
                    </ListItem>
                    <ListItem
                        button
                        selected={user.settings.theme === 'skyBlue'}
                        onClick={() => changeTheme('skyBlue')}
                        disabled={user.points < 500}
                        divider
                    >
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#89ABE3'}} variant='square'>{''}</Avatar>
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#FCF6F5'}} variant='square'>{''}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Sky Blue"
                            secondary="Unlock at 500 points"
                        />
                    </ListItem>
                    <ListItem
                        button
                        selected={false}
                        disabled
                    >
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: 'black'}} variant='square'>{''}</Avatar>
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: '#424242'}} variant='square'>{''}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Dark Mode"
                            secondary="Unlock at 10000 points"
                        />
                    </ListItem>
                </List>
            </Container>
        </Grow>
    )
}

export default Settings
