import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createEntry, updateEntry } from '../../../../actions/entries';
import { updateUser, getGuessEntry } from '../../../../actions/auth';

const Log = () => {
    const dailyEntry = useSelector((state) => state.auth.dailyEntry);
    const [entryData, setEntryData] = useState({
        highlights: dailyEntry?.highlights,
        description: dailyEntry?.description,
        selectedFile: dailyEntry?.selectedFile
    });
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_DAILY_ENTRY', data: entryData});
        if(user.result.logged) {
            // dispatch(updateEntry(currentId, entryData)); todo: figure out how to get currentId (which is the id of the entry that user previously filled out)
        } else {
            dispatch(createEntry(entryData));
            dispatch(updateUser(user.result._id, {logged: true}));
            dispatch(getGuessEntry(user.result._id)); //note: this also increments the askedCount of that entry
        }
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{user.result.logged ? 'Editing Daily Entry': 'Daily Entry'}</Typography>
                <TextField name="highlights" variant="outlined" label="Highlights" fullWidth
                    value={entryData.highlights}
                    onChange={(e) => setEntryData({ ...entryData, highlights: e.target.value})}
                    inputProps = {{ maxLength: 30 }}
                />
                <TextField name="description" variant="outlined" label="Describe your day" fullWidth multiline
                    value={entryData.description}
                    onChange={(e) => setEntryData({ ...entryData, description: e.target.value})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setEntryData({ ...entryData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Log!</Button>
                
            </form>
        </Paper>
    )
}

export default Log
