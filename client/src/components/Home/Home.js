import React from 'react';
import { Container, Grow, Grid,  } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import HomeTab from './HomeTab/HomeTab';

const Home = () => {
    const classes = useStyles();
    const userInfo = useSelector((state) => state.auth);
    console.log(userInfo)

    return (
        <Grow in>
            <Container className={classes.main} maxWidth={false}>
                        {userInfo.authData ? (
                            <HomeTab/>
                            
                        ) : (
                            <h1>Landing</h1>
                        )}
            </Container>
        </Grow>
    )
}

export default Home
