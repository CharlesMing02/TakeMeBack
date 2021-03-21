import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, createMuiTheme, ThemeProvider } from '@material-ui/core'; //Ui library for React
import { useDispatch } from 'react-redux';

import { getEntries } from './actions/entries'
import Entries from './components/Entries/Entries';
import Form from './components/Form/Form';
import useStyles from './styles';

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: '#4169E1'
        },
        secondary: {
            main: '#ffcba4'
        },
    },
    typography: {
        fontFamily: "'Source Sans Pro', sans-serif",
        h1: {
            fontFamily: "'Playfair Display', sans-serif",
            fontWeight: 400
        },
        h2: {
            fontFamily: "'Playfair Display', sans-serif",
            fontWeight: 400
        },
        h3: {
            fontFamily: "'Playfair Display', sans-serif",
            fontWeight: 400
        },
        h4: {
            fontFamily: "'Playfair Display', sans-serif",
            fontWeight: 400
        },
        h5: {
            fontFamily: "'Playfair Display', sans-serif",
            fontWeight: 400
        },
        h6: {
            fontFamily: "'Playfair Display', sans-serif",
            fontWeight: 400
        },
    }
})

const App = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEntries());
        console.log('wtf')
    }, [currentId, dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <AppBar className={classes.appBar} position="static" color="inherit"> 
                    <Typography variant="h2" align="center">Take Me Back</Typography>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={8}>
                                <Entries setCurrentId={setCurrentId}/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </ThemeProvider>
    )
}

export default App;