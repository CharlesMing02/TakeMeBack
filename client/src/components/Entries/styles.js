import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'calc(100vh - 110px)',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    
  },
}));