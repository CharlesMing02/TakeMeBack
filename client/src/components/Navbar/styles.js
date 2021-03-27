import { makeStyles } from '@material-ui/core/styles';

//personalize later
export default makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
      },
    appBar: {
        width: '100%',
        backgroundColor: theme.palette.primary.dark,
        display: 'flex',
        flexDirection: 'row',
        "@media (max-width: 600px)": {
            paddingLeft: 0,
        },
    },
    toolbar: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    mobileBar: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    drawer: {
        '& .MuiPaper-root': {
            backgroundColor: theme.palette.primary.dark
        },
        '& .MuiDrawer-paper': {
            top: 55
        }
    },
    sidePanel: {
        textDecoration: 'none', 
        color: 'white'
    },
    title: {
        // flexGrow: 1,
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        maxWidth: 200,
        "@media (max-width: 600px)": {
            paddingLeft: 0,
        },
    },
    userOptions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    score: {
        width: '100%',
        maxWidth: 100,
        // backgroundColor: theme.palette.background.paper,
    }
}));
