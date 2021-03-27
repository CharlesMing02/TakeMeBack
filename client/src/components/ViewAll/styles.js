import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    main: {
        marginTop: 0,
        padding: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    inner: {
        flexGrow: 1
    }
}));

