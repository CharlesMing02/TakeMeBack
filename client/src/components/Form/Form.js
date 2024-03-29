import React, { useState, useEffect } from 'react'; //use react hooks rather than dealing with classes and 'this' bindings 
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createEntry, updateEntry } from '../../actions/entries';

const Form = ({ currentId, setCurrentId }) => {
    const [entryData, setEntryData] = useState({ //array destructuring: first element is state object, second is setState function
        highlights: ['','',''],
        description: '',
        selectedFile: ''
    });
    const entry = useSelector((state) => currentId ? state.entries.find((entry) => entry._id === currentId) : null); //find current entry from redux store
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(entry) setEntryData(entry);
    }, [entry])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updateEntry(currentId, entryData));
        } else {
            dispatch(createEntry(entryData));
        }
        
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setEntryData({
            highlights: ['','',''],
            description: '',
            selectedFile: '' 
        });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing Past Entry': 'Daily Entry'}</Typography>
                <TextField name="h1" variant="outlined" label="H1" fullWidth
                    value={entryData.highlights[0]}
                    onChange={(e) => setEntryData({ ...entryData, highlights: [e.target.value, entryData.highlights[1], entryData.highlights[2]]})}
                    inputProps = {{ maxLength: 50 }}
                />
                <TextField name="h2" variant="outlined" label="H2" fullWidth
                    value={entryData.highlights[1]}
                    onChange={(e) => setEntryData({ ...entryData, highlights: [entryData.highlights[0], e.target.value, entryData.highlights[2]]})}
                    inputProps = {{ maxLength: 50 }}
                />
                <TextField name="h2" variant="outlined" label="H3" fullWidth
                    value={entryData.highlights[2]}
                    onChange={(e) => setEntryData({ ...entryData, highlights: [entryData.highlights[0], entryData.highlights[1], e.target.value]})}
                    inputProps = {{ maxLength: 50 }}
                />
                <TextField name="description" variant="outlined" label="Describe your day" fullWidth multiline
                    value={entryData.description}
                    onChange={(e) => setEntryData({ ...entryData, description: e.target.value})}
                />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Log!</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                
            </form>
        </Paper>
    );
}

export default Form;