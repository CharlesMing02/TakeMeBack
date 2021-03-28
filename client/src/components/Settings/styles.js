import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    main: {
        marginTop: 0,
        padding: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        color: theme.palette.primary.dark,
        paddingTop: theme.spacing(2)
    },
    section: {
        width: '100%',
        maxWidth: 360
    }
}));
