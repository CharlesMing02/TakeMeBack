import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grow, CircularProgress, Typography, Tabs, Tab, Box, AppBar, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/auth';

import useStyles from './styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={0}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Leaderboard = () => {
    const classes = useStyles();
    const users = useSelector((state) => state.auth.users);
    const user = useSelector((state) => state.auth.authData.result);
    const [value, setValue] = useState(0); //sort by points or streak
    const dispatch = useDispatch();
    const byStreak = users.sort((a, b) => {
        return b.streak - a.streak
    })
    const byPoints = [...users].sort((a, b) => {
        return b.points - a.points
    })

    useEffect(() => {
        dispatch(getUsers());
    }, []); //empty array means this only occurs on mount (otherwise would have infinite loop)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function renderStreak(u) {
        return (
            <ListItem key={u._id} selected={user._id===u._id}   className={(byStreak.indexOf(u) === 4 || u === byStreak[byStreak.length - 1]) ? classes.divider : null} >
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>{1 + byStreak.findIndex((user) => u._id===user._id)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={u.name} secondary={`Current streak: ${u.streak}`}/>
            </ListItem>
        )
    }

    function renderPoints(u) {
        return (
            <ListItem key={u._id} selected={user._id===u._id}   className={(byPoints.indexOf(u) === 4 || u === byPoints[byPoints.length - 1]) ? classes.divider : null} >
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>{1 + byPoints.findIndex((user) => u._id===user._id)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={u.name} secondary={`Points: ${u.points}`}/>
            </ListItem>
        )
    }

    return (
        !users.length ? <CircularProgress/> : (
            <Grow in>
                <Container className={classes.main} maxWidth={false}>
                    <Typography variant="h5" className={classes.title}>Leaderboard</Typography>
                    <div className={classes.board}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Streak" {...a11yProps(0)} />
                                <Tab label="Points" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} className={classes.panel}>
                            <List disablePadding>
                                {byStreak.slice(0,5).map((user) => renderStreak(user))}
                                {renderStreak(user)}
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={1} className={classes.panel}>
                            <List disablePadding>
                                {byPoints.slice(0,5).map((user) => renderPoints(user))}
                                {renderPoints(user)}
                            </List>
                        </TabPanel>
                    </div>
                </Container>
            </Grow>
        )
    )
}

export default Leaderboard
