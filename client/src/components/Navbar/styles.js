import { makeStyles } from '@material-ui/core/styles';

//personalize later
export default makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
      },
    appBar: {
        backgroundColor: theme.palette.primary.dark,
        display: 'flex',
        flexDirection: 'row'
    },
    toolbar: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    title: {
        // flexGrow: 1,
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        maxWidth: 200
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
