import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  rootMobile: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    //flexGrow: 1,
    height: '100%'
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'calc(100vh - 64px)',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
}));