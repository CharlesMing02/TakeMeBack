import React, { useState } from 'react';
import { Container, Grow, Grid,  } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';

const Home = () => {
    const classes = useStyles();
    const userInfo = useSelector((state) => state.auth);
    console.log(userInfo)

    return (
        <Grow in>
            <Container className={classes.main} maxWidth={false}>
                <Grid container>
                    <Grid item xs={12}>
                        {userInfo.authData ? (
                            <h1>HomeTab</h1>
                            
                        ) : (
                            <h1>Landing</h1>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
