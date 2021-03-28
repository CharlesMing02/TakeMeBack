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
    board: {
        width: '100%',
        maxWidth: 360,
        paddingTop: theme.spacing(2),
    },
    panel: {
        border: `1px solid ${theme.palette.divider}`
    },
    avatar: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main
    },
    divider: {
        borderBottom: `2px solid ${theme.palette.primary.dark}`
    }
}));
