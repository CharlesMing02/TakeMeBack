import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getEntries } from '../../actions/entries';

import Entries from '../Entries/Entries';
import Form from '../Form/Form';
import useStyles from './styles';

const ViewAll = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEntries());
    }, [dispatch, currentId]);

    return (
        <Grow in>
            <Container className={classes.main} maxWidth={false}>
                {currentId ? (
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <Entries setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12}>
                            <Entries setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                )}
                
            </Container>
        </Grow>
    )
}

export default ViewAll
