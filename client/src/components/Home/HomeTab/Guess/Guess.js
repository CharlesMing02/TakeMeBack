import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, Grid, Grow } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './styles';
import { updateUser } from '../../../../actions/auth';
import { getGuessEntry } from '../../../../actions/auth';

const Guess = ({ setTab }, props) => {
    const [date, changeDate] = useState(new Date());
    const [transition, changeTransition] = useState(false);
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

        const points = Math.floor((1+Math.log(user.result.streak+1)) * Math.max(100-difference, 0));
        console.log('points', points)

        dispatch(updateUser(user.result._id, { guessed: true, points: user.result.points + points, streak: user.result.streak + 1 }));
        dispatch({ type: 'UPDATE_GUESS_INFO', data: {difference: difference, points: points} });
        setTab(2)
    }
    setTimeout(() => {
        changeTransition(true);
    }, 2000)


    useEffect(() => {
        if (user.result.logged && guessEntry===null) { //meaning they logged at a different time, logged out, and logged back in
            dispatch(getGuessEntry(user.result._id));
            console.log('got new guess entry')
        }
    }, [])

    return (
        <Paper className={classes.paper} elevation={3}>
            {user.result.logged ? (
                <>
                    <Typography variant="h4">Retrieving a forgotten memory...</Typography>
                    <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grow in={transition} style={{ transformOrigin: '0 0 0'}} {...{timeout: 1000}}><Typography variant="h6">Some highlights from this day were:</Typography></Grow>
                            <Grow in={transition} style={{ transformOrigin: '0 0 0', transitionDelay: '0.5s'}} {...{timeout: 2000}}>
                                <Typography variant="body1">{guessEntry?.highlights[0]}</Typography>
                            </Grow>
                            <Grow in={transition} style={{ transformOrigin: '0 0 0', transitionDelay: '1s'}} {...{timeout: 3000}}>
                                <Typography variant="body1">{guessEntry?.highlights[1]}</Typography>
                            </Grow>
                            <Grow in={transition} style={{ transformOrigin: '0 0 0', transitionDelay: '1.5s'}} {...{timeout: 4000}}>
                                <Typography {...props} variant="body1">{guessEntry?.highlights[2]}</Typography>
                            </Grow>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="When is this from?"
                                    format="MM/dd/yyyy"
                                    value={date}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={date => changeDate(date)}
                                />
                            </MuiPickersUtilsProvider>
                            {(!user.result.guessed && guessEntry !== null) ? (
                                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Guess!</Button>
                            ) : (
                                null
                            )}
                        </Grid>
                    </form>
                </>
            ) : null }
        </Paper>
        
        
    )
}

export default Guess
