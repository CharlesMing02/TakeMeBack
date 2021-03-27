import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
  entryCard: {
    minWidth: 275,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    "@media (max-width: 450px)": {
      minWidth: 150,
    },
  },
  bottomBar: {
    marginTop: 20,
    minHeight: 30,
    display: 'flex',
    alignItems: "center"
  },
  timesAsked: {
    marginLeft: 16,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main
  }
}));