import React from 'react';
import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import ViewAll from './components/ViewAll/ViewAll';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

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
    },
    
})

const App = () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Container className={classes.root}>
                    <Navbar/>
                    <Switch>
                        <Route path="/view_all" exact component={ViewAll}/>
                        <Route path="/auth" exact component={Auth}/>
                        <Route path="/" exact component={Home}/>
                    </Switch>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
        
    )
}

export default App;