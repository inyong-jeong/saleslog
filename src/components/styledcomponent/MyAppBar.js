import { AppBar, Badge, Toolbar, Typography, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { ArrowBackIos } from '@material-ui/icons';
import React from 'react';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  appBarIcon: {
    position: 'absolute',
    right: 10,
  },
  textButtonStyle: {
    position: 'absolute',
    right: 10,
  },


})
//앱바 제목 - bartitle
//뒤로가기 버튼 보이기 - showbackbutton
// 뒤로가기 클릭시 정의해주는 path - navigate to
// 수정 버튼 보이기 및 클릭이벤트 - edit click 
// 등록 버튼 보이기 및 클릭이벤트 - save click 
// 알림 클릭 ->notiClick
// 프로필 클릭 ->profileClick
const MyAppBar = ({ barTitle, showBackButton, navigateTo, onEditClick, onSaveClick, notiClick, profileClick }) => {

  const classes = useStyles();

  return (
    <div>
      <div style={{ marginBottom: 0 , paddingBottom:0}}>
        <AppBar
          style={{ height: 48, justifyContent: 'center' }}
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
                  <IconButton color="inherit" onClick={notiClick}>
                    <Badge badgeContent={0} color="secondary">
                      <NotificationsNoneOutlinedIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                    <PermIdentityOutlinedIcon onClick={profileClick} />
                  </IconButton>
                </div>
            }
            {
              onEditClick &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onEditClick} >
                  수정
                </Button>
              </div>
            }
            {onSaveClick &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onSaveClick} >
                  저장
                </Button>
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