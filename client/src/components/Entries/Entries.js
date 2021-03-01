import React from 'react';
import { useSelector } from 'react-redux';

import Entry from './Entry/Entry';

import useStyles from './styles';

const Entries = () => {
    const entries = useSelector((state) => state.entries); //gets from global redux state
    const classes = useStyles();

    console.log(entries);

    return (
        <>
            <h1>Entries</h1>
            <Entry />
            <Entry />
        </>
    );
}

export default Entries;