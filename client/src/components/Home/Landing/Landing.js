import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Grow, Typography, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import useStyles from './styles';
import { signup } from '../../../actions/auth';

const Landing = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDemo = () => {
        const uniqueEmail = (new Date()).getTime() + '@demo.com';
        const demoAccount = {
            firstName: 'Demo',
            lastName: 'Account',
            email: uniqueEmail,
            password: 'demo',
            confirmPassword: 'demo'
        }
        dispatch(signup(demoAccount, history))
    }

    return (
        <Grow in>
            <Container className={classes.main} maxWidth={false}>
                <Grid container spacing={6} direction="row" justify="center" alignItems="stretch">
                    <Grid item xs={10} sm={4}>
                        <Typography variant="h1" className={classes.title}>Journal For Fun.</Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>I'm going to make the landing page last. For now just sign in or create an account.</Typography>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Get Started</Button>
                        <Button variant="outlined" color="primary" className={classes.demoButton} onClick={handleDemo}>Demo Account</Button>
                    </Grid>
                    <Grid item xs={10} sm={6} container alignItems="center">
                        <img src="/sticky-note.svg" alt=""/>
                    </Grid>
                </Grid>
                
                
            </Container>
        </Grow>
    )
}

export default Landing
