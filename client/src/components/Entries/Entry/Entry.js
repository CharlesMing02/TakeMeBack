import React from 'react';
import { Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';

import useStyles from './styles';

const Entry = ({ entry, setCurrentId, noEdit }) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Card className={classes.card} >
                {entry.selectedFile ? <CardMedia className={classes.media} image={entry.selectedFile} title={entry.createdAt}/> : null}
                <CardContent>
                    <Typography gutterBottom variant="h4">
                        {moment(entry.createdAt).format("MMMM Do, YYYY")}
                    </Typography>
                    {entry.highlights.map((h) => (
                        <Typography variant="body2">
                            {h}
                        </Typography>
                    ))}
                    <Typography variant="body2" color="textSecondary">
                        {entry.description}
                    </Typography>
                </CardContent>
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
            </Card>
        </Container>

    );
}

export default Entry;