import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import Log from './Log/Log';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box p={3}>
                <>{children}</> 
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const HomeTab = () => {
    const user = useSelector((state) => state.auth.authData); //gets from global redux state
    console.log(user)
    const classes = useStyles();

    //console.log(entries);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                textColor="primary"
                indicatorColor="primary"
                value={value}
                centered
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Log" {...a11yProps(0)} />
                <Tab label="Guess" {...a11yProps(1)} disabled={!user.result.logged}/>
                <Tab label="Reflect" {...a11yProps(2)} disabled={!user.result.guessed}/>
            </Tabs>
            <TabPanel value={value} index={0}>
                <Log/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Guess
            </TabPanel>
            <TabPanel value={value} index={2}>
                Entry
            </TabPanel>
        </div>
    );
}

export default HomeTab;