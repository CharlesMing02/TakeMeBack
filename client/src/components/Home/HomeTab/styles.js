import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  rootMobile: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    
  },
}));