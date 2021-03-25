import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import useStyles from './styles';
import { createEntry, updateEntry } from '../../../../actions/entries';
import { updateUser, getGuessEntry } from '../../../../actions/auth';
import { fetchSong } from '../../../../api/index';
import SongSelector from './SongSelector/SongSelector';

const Log = ({ setTab }) => {
    const entryData = useSelector((state) => state.auth.dailyEntry);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData);

    const handleChange = (e) => {
        dispatch({ type: 'UPDATE_DAILY_ENTRY', data: { ...entryData, [e.target.name]: e.target.value}});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let parseHighlights = { ...entryData, highlights: [entryData.h1, entryData.h2, entryData.h3]};
        console.log(parseHighlights);
        const { h1, h2, h3, ...rest } = parseHighlights;
        console.log(rest);
        dispatch({ type: 'UPDATE_DAILY_ENTRY', data: entryData});
        if(user.result.logged) {
            // dispatch(updateEntry(currentId, entryData)); todo: figure out how to get currentId (which is the id of the entry that user previously filled out)
        } else {
            dispatch(createEntry(rest));
            dispatch(updateUser(user.result._id, {logged: true}));
            dispatch(getGuessEntry(user.result._id)); //note: this also increments the askedCount of that entry
            setTab(1)
        }
    }

    useEffect(() => {
        const fetch = async () => { //must define new async function to avoid using async directly in useEffect
            const { data } = await fetchSong('psycho');
            console.log(data);
        }

        fetch();
    }, [])

    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography variant="h4" gutterBottom>{moment(new Date()).format("MMMM Do, YYYY")}</Typography>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Grid container  justify="center" alignItems="center">
                            <Typography variant='h6'>3 highlights of my day were:</Typography>
                            <Grid item xs={12} ><TextField name="h1" variant="outlined" label="" fullWidth inputProps = {{ maxLength: 50 }} required  margin="dense"
                                value={entryData?.h1}
                                onChange={handleChange}
                            /></Grid>
                            <Grid item xs={12}><TextField name="h2" variant="outlined" label="" fullWidth inputProps = {{ maxLength: 50 }} required size="small"
                                value={entryData?.h2}
                                onChange={handleChange}
                            /></Grid>
                            <Grid item xs={12}><TextField name="h3" variant="outlined" label="" fullWidth inputProps = {{ maxLength: 50 }} required size="small" margin="dense"
                                value={entryData?.h3}
                                onChange={handleChange}
                            /></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Grid container  justify="center" alignItems="center">
                            <Typography variant='h6'>A song I'm vibing to</Typography>
                            <Grid item xs={12}>
                                <SongSelector/>
                            </Grid>
                            <Grid item xs={12}>
                                {entryData?.selectedFile ? (
                                    <img src={entryData.selectedFile} alt="selected" height="200px"/>
                                ) : null}
                            </Grid>
                            <div className={classes.fileInput}>
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({base64}) => dispatch({ type: 'UPDATE_DAILY_ENTRY', data: { ...entryData, selectedFile: base64}})}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12}><TextField name="description" variant="outlined" label="Describe your day in more detail" fullWidth multiline
                        value={entryData?.description}
                        onChange={handleChange}
                    /></Grid>
                    
                    {user.result.logged ? (
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Edit</Button>
                    ) : (
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Log!</Button>
                    )}
                </Grid>
            </form>
        </Paper>
    )
}

export default Log
