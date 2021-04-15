import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid, Card, CardContent, CardActions, Snackbar, IconButton, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionIcon from '@material-ui/icons/Description';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
//import YouTubeIcon from '@material-ui/icons/YouTube';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import useStyles from './styles';
import { createEntry, updateEntry } from '../../../../actions/entries';
import { updateUser, getGuessEntry } from '../../../../actions/auth';
import SongSelector from './SongSelector/SongSelector';

const advice = <div style={{whiteSpace: 'pre-line'}}>
    {`Some ideas:
    \u2022 Events, achievements, something you did
    \u2022 Something you’re grateful for
    \u2022 Describe how you’re feeling
    \u2022 News (current events, sports, pop culture, etc.)
    \u2022 Interesting/funny thoughts
    \u2022 A question you wish you knew the answer to
    `}
</div>

const Log = ({ setTab }) => {
    const entryData = useSelector((state) => state.auth.dailyEntry);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData);
    const [dialOpen, setDialOpen] = useState(false);
    const lastEntry = useSelector((state) => (state.entries[state.entries.length - 1] || JSON.parse(localStorage.getItem('withID')))); //need to get id for updating
    const [snackOpen, setSnackOpen] = useState(false);

    const handleChange = (e) => {
        dispatch({ type: 'UPDATE_DAILY_ENTRY', data: { ...entryData, [e.target.name]: e.target.value}});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let parseHighlights = { ...entryData, highlights: [entryData.h1, entryData.h2, entryData.h3]};
        const { h1, h2, h3, ...rest } = parseHighlights;
        if (rest.highlights.includes(undefined) || rest.highlights.includes('')) {
            setError(true);
            if (user.result.streak === 0) {
                dispatch({
                    type: "NEXT_OR_PREV",
                    payload: { stepIndex: 3, run: true, loading: false, key: new Date() }
                })
                dispatch({ type: 'UPDATE_DAILY_ENTRY', data: {...entryData, song: null}});
            }
            return
        } else {
            setError(false);
            dispatch({ type: 'UPDATE_DAILY_ENTRY', data: entryData});
            if(user.result.logged) {
                dispatch(updateEntry(lastEntry._id, rest)); 
                setSnackOpen(true);
            } else {
                dispatch(createEntry(rest));
                dispatch(updateUser(user.result._id, {logged: true}));
                dispatch(getGuessEntry(user.result._id)); //note: this also increments the askedCount of that entry
                setTab(1)
                dispatch({
                    type: "NEXT_OR_PREV",
                    payload: { stepIndex: 7}
                })
            }
        }

    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await toBase64(file);
        dispatch({ type: 'UPDATE_DAILY_ENTRY', data: { ...entryData, selectedFile: base64}});
    }

    const handleClose = () => {
        setDialOpen(false);
    }

    const handleOpen = () => {
        setDialOpen(true);
    }

    const handleClick = (key) => { //for click of speed dial
        const returned = () => {
            let newData = { ...entryData };
            newData[key] = '';
            dispatch({ type: 'UPDATE_DAILY_ENTRY', data: newData });
            handleClose();
            if (key==='song') { //for tutorial
                dispatch({
                    type: "NEXT_OR_PREV",
                    payload: { stepIndex: 5}
                })
            }
        }
        return returned;
    }

    const actions = [ //speed dials options are only available if they have not already been added
        ...(entryData?.song != null ? [] : [{ icon: <MusicNoteIcon/>, name: 'Add music', handleClick: handleClick('song')}]), //!= actually compares to undefined or null
        ...(entryData?.selectedFile != null ? [] : [{ icon: <InsertPhotoIcon/>, name: 'Add photo', handleClick: handleClick('selectedFile')}]),
        ...(entryData?.description != null ? [] : [{ icon: <DescriptionIcon/>, name: 'Add description', handleClick: handleClick('description')}]),
        //...(entryData?.youtube != null ? [] : [{ icon: <YouTubeIcon/>, name: 'Add YouTube video', handleClick: handleClick('youtube')}]),
    ];

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    return (
        <Paper className={classes.paper} elevation={3} id="paper">
            <Typography variant="h4" gutterBottom>{moment(new Date()).format("MMMM Do, YYYY")}</Typography>
            
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs>
                        <Card variant="outlined" className={classes.entryCard} id="highlights">
                            <CardContent>
                                <Grid container  justify="center" alignItems="center" spacing={0} >
                                    <Typography variant='h6'>3 highlights of my day were:</Typography>
                                    <Grid item xs={12} container justify="center"><TextField name="h1" variant="outlined" label="" style={{width: '90%'}} inputProps = {{ maxLength: 50 }} required  size="small"
                                        value={entryData?.h1}
                                        error={error}
                                        onChange={handleChange}
                                    /></Grid>
                                    <Grid item xs={12} container justify="center"><TextField name="h2" variant="outlined" label="" style={{width: '90%'}} inputProps = {{ maxLength: 50 }} required size="small"
                                        value={entryData?.h2}
                                        error={error}
                                        onChange={handleChange}
                                    /></Grid>
                                    <Grid item xs={12} container justify="center"><TextField name="h3" variant="outlined" label="" style={{width: '90%'}} inputProps = {{ maxLength: 50 }} required size="small"
                                        value={entryData?.h3}
                                        onChange={handleChange}
                                        error={error}
                                        helperText={error ? 'Please fill out all highlights. They will be used to guess this entry later.': ''}
                                    /></Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Tooltip title={advice} interactive enterTouchDelay={0}>
                                    <Button size="small" color="primary" className={classes.cardButton}>?</Button>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>
                    {(entryData?.song || entryData?.song==='') ? (
                        <Grid item xs>
                            <Card variant="outlined" className={classes.entryCard} id="song">
                                <CardContent>
                                    <Grid container  justify="center" alignItems="center">
                                        <Typography variant='h6'>A song I'm vibing to</Typography>
                                        {entryData?.song ? (
                                            <Grid item xs={12}>
                                                <iframe title="soundcloudPlayer" width="100%" height="200px" scrolling="no" frameborder="no" src={`https://w.soundcloud.com/player/?url=${entryData.song.uri}&amp;show_artwork=true&amp;visual=true&amp;color=${user?.result?.settings?.theme==='default' ? 'ffcba4' : '5F779E'}&amp;auto_play=${user?.result?.settings?.autoplay}&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=false&amp;buying=false&amp;liking=false`}></iframe>
                                            </Grid>) : (
                                            <Grid item xs={12} container justify="center">
                                                <SongSelector/>
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                                <CardActions className={classes.actionArea}>
                                    <Button onClick={() => {dispatch({ type: 'UPDATE_DAILY_ENTRY', data: { ...entryData, song: null} });}} size="small" color="primary" className={classes.cardButton}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ) : null}
                    {(entryData?.selectedFile || entryData?.selectedFile==='') ? (
                        <Grid item xs>
                            <Card variant="outlined" className={classes.entryCard}>
                                <CardContent className={classes.imageContent}>
                                    <Grid container className={classes.imageContent} justify="center" alignItems="center">
                                        {entryData?.selectedFile ? (
                                            <img src={entryData.selectedFile} alt="selected" width="100%"/>
                                        ) : <Grid container justify="center" alignItems="center">
                                                <input accept="image/*" type="file" multiple={false} className={classes.input} id="contained-button-file"
                                                    onChange={(e) => {
                                                        uploadImage(e);
                                                    }}
                                                />
                                                <label htmlFor="contained-button-file"><Button variant="outlined" color="primary" component="span">Upload Image</Button></label>
                                            </Grid>}
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => {dispatch({ type: 'UPDATE_DAILY_ENTRY', data: { ...entryData, selectedFile: null} });}} size="small" color="primary" className={classes.cardButton}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ) : null}
                    {(entryData?.description || entryData?.description==='') ? (
                        <Grid item xs>
                            <Card variant="outlined" className={classes.entryCard}>
                                <CardContent>
                                    <TextField name="description" variant="outlined" label="Describe your day in more detail" fullWidth multiline
                                    value={entryData?.description}
                                    onChange={handleChange}
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => {dispatch({ type: 'UPDATE_DAILY_ENTRY', data: { ...entryData, description: null} });}} size="small" color="primary" className={classes.cardButton}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ) : null}
                    
                    <SpeedDial ariaLabel="SpeedDial" direction='left' className={classes.speedDial} icon={<SpeedDialIcon/>} onClose={handleClose} onOpen={handleOpen} open={dialOpen}>
                        {actions.map((action) => (
                            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} tooltipPlacement='bottom'
                                onClick={action.handleClick}
                            />
                        ))}
                    </SpeedDial>
                    {user.result.logged ? (
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Edit</Button>
                    ) : (
                        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Log!</Button>
                    )}
                </Grid>
            </form>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Saved"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Paper>
    )
}

export default Log
