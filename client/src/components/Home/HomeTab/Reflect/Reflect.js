import React from 'react'
import { Typography, Paper, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import Entry from '../../../Entries/Entry/Entry';

const Reflect = () => {
    const classes = useStyles();
    const guessEntry = useSelector((state) => state.auth.guessEntry);
    const guessInfo = useSelector((state) => state.auth.guessInfo);

    return (
        <Paper className={classes.paper}>
            <Container maxWidth="md">
                {guessEntry ? (
                    <>
                        {guessInfo.points > 0 ? (
                            <Typography variant='h6'>Great guess! You were off by {guessInfo.difference} days.</Typography>
                        ) : (
                            <Typography variant='h6'>Good try. You were off by {guessInfo.difference} days.</Typography>
                        )}
                        <Typography variant='subtitle2'>Streak: +1, Points: +{guessInfo.points}</Typography>
                        <Entry entry={guessEntry} noEdit={true}/>
                    </>
                ) : null}
            </Container>
        </Paper>
    )
}

export default Reflect
