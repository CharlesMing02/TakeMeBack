import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import useStyles from './styles';
import { createEntry, updateEntry } from '../../../../actions/entries';
import { updateUser, getGuessEntry } from '../../../../actions/auth';

const Log = ({ setTab }) => {
    const [entryData, setEntryData] = useState(JSON.parse(localStorage.getItem('dailyEntry')));
    //const dailyEntry = useSelector((state) => state.auth.dailyEntry);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData);

    useEffect(() => {
        dispatch({ type: 'UPDATE_DAILY_ENTRY', data: entryData});
    }, [dispatch, entryData])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_DAILY_ENTRY', data: entryData});
        if(user.result.logged) {
            // dispatch(updateEntry(currentId, entryData)); todo: figure out how to get currentId (which is the id of the entry that user previously filled out)
        } else {
            dispatch(createEntry(entryData));
            dispatch(updateUser(user.result._id, {logged: true}));
            dispatch(getGuessEntry(user.result._id)); //note: this also increments the askedCount of that entry
            setTab(1)
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography variant="h4" gutterBottom>{moment(new Date()).format("MMMM Do, YYYY")}</Typography>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                
                <TextField name="highlights" variant="outlined" label="Highlights" fullWidth
                    value={entryData?.highlights}
                    onChange={(e) => setEntryData({ ...entryData, highlights: e.target.value})}
                    inputProps = {{ maxLength: 50 }}
                />
                <TextField name="description" variant="outlined" label="Describe your day" fullWidth multiline
                    value={entryData?.description}
                    onChange={(e) => setEntryData({ ...entryData, description: e.target.value})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setEntryData({ ...entryData, selectedFile: base64})}
                    />
                </div>
                {user.result.logged ? (
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Edit</Button>
                ) : (
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Log!</Button>
                )}
                
            </form>
        </Paper>
    )
}

export default Log
