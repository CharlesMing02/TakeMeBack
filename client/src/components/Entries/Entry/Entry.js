import React from 'react';
import { Button, Card, CardContent, CardMedia, Container, Grid, Typography, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import ReactPlayer from 'react-player/soundcloud'

import useStyles from './styles';

const Entry = ({ entry, setCurrentId, noEdit }) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper} elevation={3}>
                <Typography gutterBottom variant="h4">
                    {moment(entry.createdAt).format("MMMM Do, YYYY")}
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs>
                        <Card variant="outlined" className={classes.entryCard}>
                            <CardContent>
                                <Grid container direction="column" justify="center" alignItems="center" spacing={0} >
                                    <Typography variant='h6'>3 highlights of my day were:</Typography>
                                    {entry.highlights.map((h) => (
                                        <Typography variant="body1">
                                            {h}
                                        </Typography>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    {entry.song ? (
                        <Grid item xs>
                            <Card variant="outlined" className={classes.entryCard}>
                                <CardContent>
                                    <Grid container  justify="center" alignItems="center">
                                        <Typography variant='h6'>A song I'm vibing to</Typography>
                                        <Grid item xs={12}>
                                            <ReactPlayer url={entry.song.permalink_url} width='100%' height='200px' volume={0.5} playing={true}/>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ) : null}
                    {entry.selectedFile ? (
                        <Grid item xs>
                            <Card variant="outlined" className={classes.entryCard}>
                                <img src={entry.selectedFile} alt="selected" width="100%"/>
                            </Card>
                        </Grid>
                    ) : null}
                    {entry.description ? (
                        <Grid item xs>
                            <Card variant="outlined" className={classes.entryCard}>
                                <CardContent>
                                    <Typography variant='body2' align='center'>{entry.description}</Typography>
                                </CardContent>   
                            </Card>
                        </Grid>
                    ) : null}
                </Grid>
                
            </Paper>
            <Paper className={classes.bottomBar} elevation={3}>
                <Grid container justify="space-between">
                    <Typography className={classes.timesAsked} variant="body2">
                        {`Times asked: ${entry.askedCount}`}
                    </Typography>
                    {noEdit ? null : (
                        <Button color="primary" onClick={() => setCurrentId(entry._id)} variant="outlined">
                            <EditIcon/>
                        </Button>
                    )}
                </Grid>
            </Paper>
        </Container>

    );
}

export default Entry;