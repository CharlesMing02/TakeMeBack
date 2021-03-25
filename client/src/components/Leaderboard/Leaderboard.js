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
    const byStreak = users.sort((a, b) => {
        return a.streak - b.streak
    })
    const byPoints = users.sort((a, b) => {
        return a.points - b.points
    })

    useEffect(() => {
        dispatch(getUsers());
    }, []); //empty array means this only occurs on mount (otherwise would have infinite loop)

    return (
        !users.length ? <CircularProgress/> : (
            <Grow in>
                <Container className={classes.main} maxWidth={false}>
                    <h1>Leaderboard</h1>
                    <h2>By Streak</h2>
                    {byStreak.map((user) => (
                        <p>{user.name}: {user.streak}</p>
                    ))}
                    <h2>By Points</h2>
                    {byPoints.map((user) => (
                        <p>{user.name}: {user.points}</p>
                    ))}
                </Container>
            </Grow>
        )
    )
}

export default Leaderboard
