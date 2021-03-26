import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(4),
    position: 'relative'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  entryCard: {
    minWidth: 275,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  imageContent: {
    height: '100%'
  },
  cardButton: {
    marginLeft: 'auto',
  },
  speedDial: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2)
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  input: {
    display: 'none',
  }
}));