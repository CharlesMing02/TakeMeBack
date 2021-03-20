import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import moment from 'moment';

import useStyles from './styles';

const Entry = ({ entry }) => {
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
        </Card>

    );
}

export default Entry;