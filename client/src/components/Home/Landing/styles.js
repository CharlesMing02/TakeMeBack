import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    main: {
        marginTop: 0,
        padding: 24,
        flexGrow: 1,
        // height: '90vh',
        // maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: theme.palette.background.paper,
        background: 'linear-gradient(-60deg, #4169E1 0%,  #ffcba4 80%)',
    },
    title: {
        color: theme.palette.primary.dark,
        paddingTop: theme.spacing(2)
    },
    subtitle: {
        color: theme.palette.primary.dark,
        // fontSize: '2rem',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    demoButton: {
        marginLeft: theme.spacing(2)
    }
}));
