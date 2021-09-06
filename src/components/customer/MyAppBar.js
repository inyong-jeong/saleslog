import { AppBar, Badge, Toolbar, Typography, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';

import { ArrowBackIos } from '@material-ui/icons';
import { useHistory } from 'react-router';
import React from 'react';

const useStyles = makeStyles({
  appBarIcon: {
    position: 'absolute',
    right: 10,
  }
})

//뒤로가기 버튼이 보이게 하고 싶다면 isRegisterPage prop으로 넘겨주면 됨 
const MyAppBar = ({ barTitle, showBackButton }) => {

  const classes = useStyles();

  const history = useHistory()
  const navigateBack = () => history.push('/')

  //const [value, setValue] = useState('')

  return (
    <div>
      <div style={{ marginBottom: 70 }}>
        <AppBar
          style={{ height: '48px', justifyContent: 'center' }}
          elevation={1}
          className={classes.appBar}
          color='default'>
          <Toolbar>
            {
              showBackButton ?
                <IconButton color="inherit" onClick={navigateBack}>
                  <ArrowBackIos />
                </IconButton>
                : <div className={classes.appBarIcon}>
                  <IconButton color="inherit">
                    <Badge badgeContent={0} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                    <AccountCircle />
                  </IconButton>
                </div>
            }
            <Typography variant="h6"
              style={{ fontSize: 14, fontWeight: 'normal' }}>
              {barTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

export default MyAppBar;