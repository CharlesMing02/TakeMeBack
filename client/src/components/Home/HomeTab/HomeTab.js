import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import Log from './Log/Log';
import Guess from './Guess/Guess';
import Reflect from './Reflect/Reflect';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{flexGrow: 1}}
            {...other}
        >
            {value === index && (
            <Container maxWidth="md" >
                <>{children}</> 
            </Container>
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
    const classes = useStyles();
    const [mobile, setMobile] = useState(false);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        console.log('useEffect storage removal:', user.result.logged === false)
        if (user.result.logged === false) {
            localStorage.removeItem('dailyEntry');
            localStorage.removeItem('guessEntry');
            localStorage.removeItem('guessInfo');
        }
    }, [user.result.logged])

    useEffect(() => {
        const setResponsiveness = () => {
            return (window.innerWidth < 1000) ? setMobile(true) : setMobile(false);
        }
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={mobile ? classes.rootMobile : classes.root}>
            <Tabs
                orientation={mobile ? "horizontal" : "vertical"}
                textColor="primary"
                indicatorColor="primary"
                variant={mobile ? "fullWidth" : "scrollable"}
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={mobile ? null : classes.tabs}
            >
                <Tab label="Log" {...a11yProps(0)} />
                <Tab label="Guess" {...a11yProps(1)} disabled={!user.result.logged}/>
                <Tab label="Reflect" {...a11yProps(2)} disabled={!user.result.guessed}/>
            </Tabs>
            <TabPanel value={value} index={0}>
                <Log setTab={setValue}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Guess setTab={setValue}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Reflect/>
            </TabPanel>
        </div>
    );
}

export default HomeTab;