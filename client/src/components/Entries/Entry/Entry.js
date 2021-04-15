import React from 'react';
import { Button, Card, CardContent, Container, Grid, Typography, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector } from 'react-redux';
import moment from 'moment';

import useStyles from './styles';

const Entry = ({ entry, setCurrentId, noEdit }) => {
    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData);

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
                                            <iframe title="soundcloudPlayer" width="100%" height="200px" scrolling="no" frameborder="no" src={`https://w.soundcloud.com/player/?url=${entry.song.uri}&amp;show_artwork=true&amp;visual=true&amp;color=${user?.result?.settings?.theme==='default' ? 'ffcba4' : '5F779E'}&amp;auto_play=${user?.result?.settings?.autoplay}&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=false&amp;buying=false&amp;liking=false`}></iframe>
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