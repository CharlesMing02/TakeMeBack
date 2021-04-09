import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

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
            <Container maxWidth="md" id={`panel-container-${index}`}>
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
    const tutorial = useSelector((state) => state.tutorial);
    const dispatch = useDispatch();
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

    useEffect(() => { //start tutorial if user streak is 0
        if (user.result.streak === 0) {
            dispatch({ type: "RESTART" });
        }
    }, []);

    const callback = data => { //for tutorial
        const { action, index, type, status } = data;

        if (action === ACTIONS.CLOSE || (status === STATUS.SKIPPED && tutorial.run) || status === STATUS.FINISHED) {
            dispatch({ type: 'STOP' });
        } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
            dispatch({
                type: "NEXT_OR_PREV",
                payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1)}
            });
        }
    }

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
            <Joyride 
                spotlightClicks
                spotlightPadding={0} 
                {...tutorial}
                callback={callback}
                showSkipButton={true} 
                disableOverlayClose
                disableCloseOnEsc
                hideCloseButton={true}
                locale={{
                    last: "End tutorial",
                    skip: "Skip tutorial"
                }}
                styles={{
                    options: {
                        primaryColor: '#4169E1'
                    },
                    buttonClose: {
                        display: 'none'
                    }
                }}
            />
        </div>
    );
}

export default HomeTab;