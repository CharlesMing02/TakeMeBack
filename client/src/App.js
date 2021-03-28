import React from 'react';
import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import ViewAll from './components/ViewAll/ViewAll';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Settings from './components/Settings/Settings';

import useStyles from './styles';
import { bluePeach, skyBlue } from './themes';

const defaultTheme = createMuiTheme(bluePeach);
const skyBlueTheme = createMuiTheme(skyBlue);

const App = () => {
    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData); 
    console.log("If you're poking around here you might find the Github interesting: https://github.com/CharlesMing02/TakeMeBack");

    return (
        <BrowserRouter>
            <ThemeProvider theme={(user?.result?.settings?.theme==='skyBlue') ? skyBlueTheme : defaultTheme }> 
                <Container className={classes.root}>
                    <Navbar/>
                    <Switch>
                        <Route path="/view_all" exact component={ViewAll}/>
                        <Route path="/auth" exact component={Auth}/>
                        <Route path="/" exact component={Home}/>
                        <Route path="/leaderboard" exact component={Leaderboard}/>
                        <Route path="/settings" exact component={Settings}/>
                    </Switch>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
        
    )
}

export default App;