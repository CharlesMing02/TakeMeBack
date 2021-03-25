import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/auth';

import useStyles from './styles';

const Leaderboard = () => {
    const classes = useStyles();
    const users = useSelector((state) => state.auth.users);
    //const [sort, setSort] = useState('points') //sort by points or streak
    const dispatch = useDispatch();
    console.log(users.length)

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        !users.length ? <CircularProgress/> : (
            <Grow in>
                <Container className={classes.main} maxWidth={false}>
                    <h1>Leaderboard</h1>
                    {users.map((user) => (
                        <p>{user.name}: {user.points}</p>
                    ))}
                </Container>
            </Grow>
        )
    )
}

export default Leaderboard
