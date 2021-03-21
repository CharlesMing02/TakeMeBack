import { makeStyles } from '@material-ui/core/styles';

//personalize later
export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    appBar: {
        backgroundColor: theme.palette.primary.dark,
        display: 'flex',
        flexDirection: 'row'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 24
    },
    score: {
        width: '100%',
        maxWidth: 100,
        backgroundColor: theme.palette.background.paper,
    }
}));

// appBar: {
//     borderRadius: 15,
//     margin: '30px 0',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },