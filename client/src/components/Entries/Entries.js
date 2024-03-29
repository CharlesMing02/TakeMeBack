import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Container, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Entry from './Entry/Entry';

import useStyles from './styles';

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
            <Container maxWidth="md">
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

const Entries = ({ setCurrentId }) => {
    const entries = useSelector((state) => state.entries); //gets from global redux state
    const classes = useStyles();
    const [mobile, setMobile] = useState(false);
    const [value, setValue] = React.useState(0);

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
        !entries.length ? <CircularProgress/> : ( //loading spinner while no entries loaded in
            <div className={mobile ? classes.rootMobile : classes.root}>
                <Tabs
                    orientation={mobile ? "horizontal" : "vertical"}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={mobile ? null : classes.tabs}
                >
                    {entries.map((entry) => (
                        <Tab label={moment(entry.createdAt).format("MMM Do YY")} key={entry._id} {...a11yProps(entries.indexOf(entry))} />
                    ))}
                </Tabs>
                {entries.map((entry) => (
                    <TabPanel value={value} index={entries.indexOf(entry)} key={entry._id}>
                        <Entry entry={entry} setCurrentId={setCurrentId}/>
                    </TabPanel>
                ))}
            </div>
        )
    );
}

export default Entries;