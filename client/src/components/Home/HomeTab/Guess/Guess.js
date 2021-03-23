import React, { useState } from 'react';
import { Button, Typography, Paper, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './styles';
import { updateUser } from '../../../../actions/auth';

const Guess = () => {
    const [date, changeDate] = useState(new Date());
    const classes = useStyles();
    const dispatch = useDispatch();
    const guessEntry = useSelector((state) => state.auth.guessEntry);
    const user = useSelector((state) => state.auth.authData);

    const handleSubmit = (e) => {
        e.preventDefault();

        const guess = new Date(date)
        const date1 = Date.UTC(guess.getFullYear(), guess.getMonth(), guess.getDate());
        const correct = new Date(guessEntry.createdAt);
        const date2 = Date.UTC(correct.getFullYear(), correct.getMonth(), correct.getDate());
        const ms = Math.abs(date1-date2);
        const difference = Math.floor(ms/1000/60/60/24); //above lines calculate difference in days
        console.log('difference', difference)

        const points = Math.floor(Math.log(user.result.streak) * Math.max(100-difference, 0));
        console.log('points', points)

        dispatch(updateUser(user.result._id, { guessed: true, points: user.result.points + points, streak: user.result.streak + 1 }))
    }

    return (
        <Paper className={classes.paper}>
            {user.result.logged ? (
                <Container maxWidth="md">
                    <Typography variant="h6">Some highlights from this day were...</Typography>
                    <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                        
                        <Typography variant="body1">test{guessEntry?.highlights}</Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                autoOk
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                value={date}
                                onChange={changeDate}
                            />
                        </MuiPickersUtilsProvider>
                        {!user.result.guessed ? (
                            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Guess!</Button>
                        ) : (
                            null
                        )}
                    </form>
                    </Container>
            ) : null }
        </Paper>
        
        
    )
}

export default Guess
