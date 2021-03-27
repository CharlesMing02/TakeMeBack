import React from 'react';
import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import ViewAll from './components/ViewAll/ViewAll';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard/Leaderboard';

import useStyles from './styles';
import { bluePeach, skyBlue } from './themes';

const defaultTheme = createMuiTheme(bluePeach);
const skyBlueTheme = createMuiTheme(skyBlue);

const App = () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
                <Container className={classes.root}>
                    <Navbar/>
                    <Switch>
                        <Route path="/view_all" exact component={ViewAll}/>
                        <Route path="/auth" exact component={Auth}/>
                        <Route path="/" exact component={Home}/>
                        <Route path="/leaderboard" exact component={Leaderboard}/>
                    </Switch>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
        
    )
}

export default App;