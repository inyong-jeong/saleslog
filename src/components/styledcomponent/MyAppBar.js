import { AppBar, Badge, Toolbar, Typography, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';

import { ArrowBackIos } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
  appBarIcon: {
    position: 'absolute',
    right: 10,
  }
})

//순서대로 제목, 백버튼, 백버튼 클릭시 이동할 곳 경로 정의해주면 됨 
const MyAppBar = ({ barTitle, showBackButton, navigateTo }) => {

  const classes = useStyles();

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
                <IconButton color="inherit" onClick={navigateTo}>
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