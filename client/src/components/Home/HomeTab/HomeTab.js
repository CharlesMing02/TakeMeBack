import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, CircularProgress } from '@material-ui/core';

import useStyles from './styles';

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

const HomeTab = ({ }) => {
    //const entries = useSelector((state) => state.entries); //gets from global redux state
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
                <Tab label="Guess" {...a11yProps(1)} />
                <Tab label="Reflect" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                Log
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