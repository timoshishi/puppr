import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthNav from './AuthNav';
import AuthenticationButton from '../AuthButtons/authentication-button';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Pupper
          </Typography>
          {isAuthenticated && <AuthNav />}

          <AuthenticationButton color='white' />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
