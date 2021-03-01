import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'; //Ui library for React
import { useDispatch } from 'react-redux';

import { getEntries } from './actions/entries'
import Entries from './components/Entries/Entries';
import Form from './components/Form/Form';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEntries());
    }, [dispatch]);

    return (
        <Container>
            <AppBar className={classes.appBar} position="static" color="inherit"> 
                <Typography className={classes.heading} variant="h2" align="center">Take Me Back</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Entries />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;