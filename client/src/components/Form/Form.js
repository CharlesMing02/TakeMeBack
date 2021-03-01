import React, { useState } from 'react'; //use react hooks rather than dealing with classes and 'this' bindings 
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { createEntry } from '../../actions/entries';

const Form = () => {
    const [entryData, setEntryData] = useState({ //array destructuring: first element is state object, second is setState function
        creator: '',
        highlights: '',
        description: '',
        selectedFile: ''
    });
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createEntry(entryData));
    }

    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Daily Entry</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth
                    value={entryData.creator}
                    onChange={(e) => setEntryData({ ...entryData, creator: e.target.value})}
                />
                <TextField name="highlights" variant="outlined" label="Highlights" fullWidth
                    value={entryData.highlights}
                    onChange={(e) => setEntryData({ ...entryData, highlights: e.target.value})}
                />
                <TextField name="description" variant="outlined" label="Describe your day" fullWidth
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
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                
            </form>
        </Paper>
    );
}

export default Form;