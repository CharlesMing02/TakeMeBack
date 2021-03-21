import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

import useStyles from './styles';

const Entry = ({ entry, setCurrentId }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            {entry.selectedFile ? <CardMedia className={classes.media} image={entry.selectedFile} title={entry.createdAt}/> : null}
            <CardContent>
                <Typography gutterBottom variant="h4">
                    {moment(entry.createdAt).format("MMMM Do, YYYY")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {entry.description}
                </Typography>
            </CardContent>
            <Grid container justify="flex-end">
                <Button color="primary" onClick={() => setCurrentId(entry._id)}>
                    <EditIcon/>
                </Button>
            </Grid>
            
        </Card>

    );
}

export default Entry;