import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Grow, Typography, Grid, Button } from '@material-ui/core';

import useStyles from './styles';

const Landing = () => {
    const classes = useStyles();

    return (
        <Grow in>
            <Container className={classes.main} maxWidth={false}>
                <Grid container spacing={2} direction="row" justify="center" alignItems="stretch">
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h1" className={classes.title}>Journal For Fun.</Typography>
                        <Typography variant="subtitle1" className={classes.subtitle}>I'm going to make the landing page last. For now just sign in or create an account.</Typography>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Get Started</Button>
                        <Button variant="outlined" color="primary" className={classes.demoButton}>Demo (not implemented)</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} container alignItems="center">
                        <img src="/sticky-note.svg" alt=""/>
                    </Grid>
                </Grid>
                
                
            </Container>
        </Grow>
    )
}

export default Landing
