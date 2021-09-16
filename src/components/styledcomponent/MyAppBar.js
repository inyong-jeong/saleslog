import { AppBar, Badge, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useMediaQuery } from "react-responsive";
import { Divider } from 'antd';
import { ReactComponent as Noti } from '../.././assets/icons/noti.svg'
import { ReactComponent as Person } from '../.././assets/icons/person.svg'
import { ReactComponent as BackIcon } from '../.././assets/icons/back.svg'
import { ReactComponent as AddIcon } from '../.././assets/icons/plus.svg'
import { ReactComponent as Notice } from '../.././assets/icons/main/notice.svg'
import { ReactComponent as Support } from '../.././assets/icons/main/support.svg'
import { ReactComponent as WorkNotice } from '../.././assets/icons/main/notice_workgroup.svg'
import { ReactComponent as Setting } from '../.././assets/icons/main/setting.svg'
import { Menu, Dropdown, } from 'antd';
const useStyles = makeStyles({
  appBarIcon: {
    position: 'absolute',
    right: 10,
  },
  textButtonStyle: {
    position: 'absolute',
    right: 10,
  },
  tempButtonStyle: {
    position: 'absolute',
    right: 80,
  },
})
//앱바 제목 - bartitle
//뒤로가기 버튼 보이기 - showbackbutton
//뒤록가기 버튼 클릭 -  navigate to
// 수정 버튼 보이기 및 클릭이벤트 - edit click 
// 등록 버튼 보이기 및 클릭이벤트 - save click 
// 알림 클릭 ->notiClick
// 프로필 클릭 ->profileClick
//navigateNext ->  텍스트 옆에 다른 곳으로 이동하는 오른쪽 버튼 넣어주고 싶을 때 정의 
//showAddButton -> 오른쪽에 + 버튼 표시 
//onAddClick ->  showAddButton 의 클릭 이벤트 정의 
const MyAppBar = ({
  barTitle,
  showBackButton,
  showAddButton,
  navigateTo,
  onEditClick,
  onSaveClick,
  notiClick,
  //profileClick,
  navigateNext,
  tempSaveClick,
  onAddClick,
  badgeContent
}) => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  const profileClick = () => {
    console.log('프로필 클릭 ')

  }
  //profile menu 
  const menu = (
    <Menu onClick={profileClick}>
      <Menu.Item key="1">내 프로필 </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2"> <WorkNotice />워크그룹 공지 </Menu.Item>
      <Menu.Item key="3"><Notice />시스템 공지</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5"> <Setting />알림 설정</Menu.Item>
      <Menu.Item key="4"> <Support />지원센터 </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5">세일즈로그 정보</Menu.Item>
    </Menu>
  );

  const classes = useStyles();

  return (
    <div>
      <div>
        <div
          style={{ height: 48, justifyContent: 'center', alignItems: 'center', background: '#ffffff', position: 'sticky', top: 0, }}
          color='default'>
          <Toolbar>
            {
              showBackButton &&
              <IconButton color="inherit" onClick={navigateTo}>
                <BackIcon />
              </IconButton>

            }
            {
              isMobile && !showBackButton &&
              <div className={classes.appBarIcon}>
                <IconButton color="inherit" onClick={notiClick}>
                  <Badge badgeContent={badgeContent} color="secondary">
                    <Noti stroke='#333333' />
                  </Badge>
                </IconButton>
                <Dropdown overlay={menu}>
                  <IconButton color="inherit">
                    <Person stroke='#333333' />
                  </IconButton>
                </Dropdown>
              </div>
            }
            {
              showAddButton &&
              <div className={classes.appBarIcon}>
                <IconButton color="inherit" onClick={onAddClick}>
                  <AddIcon />
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

            {
              tempSaveClick &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={tempSaveClick} >
                  임시저장
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

            {
              navigateNext &&
              <IconButton color="inherit" onClick={navigateNext}>
                <NavigateNextIcon />
              </IconButton>
            }
          </Toolbar>
        </div>
      </div>
      <Divider style={{ marginTop: 10, }} />
    </div>

  );
}

export default MyAppBar;