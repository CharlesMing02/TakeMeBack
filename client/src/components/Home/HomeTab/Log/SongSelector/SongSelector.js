import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSong } from '../../../../../api/index';

const SongSelector = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const dailyEntry = useSelector((state) => state.auth.dailyEntry);
    const dispatch = useDispatch();

    React.useEffect(() => {
        let active = true;
    

        if (inputValue === '') {
            setOptions(dailyEntry?.song ? [dailyEntry.song] : []);
            return undefined;
        }
    
        (async () => {
          const { data } = await fetchSong(inputValue);
    
            if (active) {
                let newOptions = [];

                // if (dailyEntry?.song) {
                //     newOptions = [dailyEntry.song];
                // }

                if (data) {
                    newOptions = [...newOptions, ...data.collection]
                }
                setOptions(newOptions);
            }
        })();
    
        return () => {
            active = false;
        };
    }, [dailyEntry?.song, inputValue]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="song-selector"
            style={{ width: '100%' }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            autoComplete
            value={dailyEntry?.song || undefined}
            filterOptions={(x) => x}
            getOptionLabel={(song) => `${song.title} - ${song?.user?.username}`}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                dispatch({ type: 'UPDATE_DAILY_ENTRY', data: { ...dailyEntry, song: newValue}});
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search for songs"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                    }}
                    style={{width: '95%'}}
                />
            )}
        />
    )
}

export default SongSelector
