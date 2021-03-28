import React from 'react';
import { Container, Grow } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import HomeTab from './HomeTab/HomeTab';
import Landing from './Landing/Landing';

const Home = () => {
    const classes = useStyles();
    const userInfo = useSelector((state) => state.auth);

    return (
        <Grow in>
            <Container className={classes.main} maxWidth={false}>
                        {userInfo.authData ? (
                            <HomeTab/>
                        ) : (
                            <Landing/>
                        )}
            </Container>
        </Grow>
    )
}

export default Home
