import {
  Badge, Toolbar, Typography,
  IconButton,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useMediaQuery } from "react-responsive";
import { Divider } from 'antd';
import { ReactComponent as Noti } from '../.././assets/icons/noti.svg'
import { ReactComponent as Info } from '../.././assets/icons/info.svg'
import { ReactComponent as Person } from '../.././assets/icons/person.svg'
import { ReactComponent as Logout } from '../.././assets/icons/main/logout.svg'
import { ReactComponent as BackIcon } from '../.././assets/icons/back.svg'
import { ReactComponent as AddIcon } from '../.././assets/icons/plus.svg'
import { ReactComponent as Notice } from '../.././assets/icons/main/notice.svg'
import { ReactComponent as Support } from '../.././assets/icons/main/support.svg'
import { ReactComponent as WorkNotice } from '../.././assets/icons/main/notice_workgroup.svg'
import { ReactComponent as Setting } from '../.././assets/icons/main/setting.svg'
import { Menu, Dropdown, } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { removeAll } from 'helpers/authUtils';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
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

const MyAppBar = ({
  barTitle,
  showBackButton,
  showAddButton,
  navigateTo,
  onEditClick,
  onSaveClick,
  onDeleteClick,
  onAddClick,
  notiClick,
  onRevise,
  tempSaveClick,
  navigateNext,
  badgeContent,
  paramId,
  Dbutton,
  Ubutton,
  onWorkGroupEdit,
  onWorkGroupDelete
}) => {


  const history = useHistory()
  const classes = useStyles()
  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  // const [anchorEl, setAnchorEl] = useState(null)
  // const open = Boolean(open)

  const onProfileClick = (e) => {
    console.log('프로필 클릭 ', e)
    // setAnchorEl(e.currentTarget)
  }
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const onLogoutClick = () => {
    confirm({
      title: '정말로 로그아웃 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      // content: '로그아웃을 하시면 재로그인이 필요합니다.',
      cancelText: '취소',
      okText: '확인',
      onOk() {
        removeAll();
        history.push('/signin')
      },
      onCancel() {
        //취소
      },
    })

  }
  //profile menu 
  //warnKey error & keyEvent error는 link로 감싸서 생기는 문제
  // 안에 키값으로 이동하는 걸로 바꿔야됨 
  const menu = (
    <Menu onClick={onProfileClick} >
      <Link to={'/main/etc/profile'}>
        <Menu.Item key="1"> 내 프로필 </Menu.Item>
      </Link>
      <Menu.Divider />
      <Menu.Item key="2">
        <Link to={'/main/etc/notice/group'}>
          <WorkNotice /> 워크그룹 공지
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={'/main/etc/notice/system'}>
          <Notice /> 시스템 공지
        </Link>
      </Menu.Item>
      <Menu.Divider />
      {/* <Menu.Item key="4">
        <Link to={'/main/notification'}>
          <Setting /> 알림 설정
        </Link>
      </Menu.Item> */}
      <Menu.Item key="5">
        <Link to={'/main/support'}>
          <Support /> 지원센터
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">
        <div onClick={onLogoutClick}>
          <Logout stroke="black" /> 로그아웃
        </div>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to={'/main/information'}>
          <Info /> 정보</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#fff'
      }}>
      <div>
        <div
          style={{
            height: 48,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
                {/* <IconButton color="inherit" onClick={notiClick}>
                  <Badge badgeContent={badgeContent} color="secondary">
                    <Noti stroke='#333333' />
                  </Badge>
                </IconButton> */}
                <Dropdown
                  trigger="click"
                  overlay={menu}>
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
              (Ubutton === 'Y' && onEditClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={onEditClick} >
                  수정
                </Button>
              </div>
            }
            {
              (Dbutton === 'Y' && onDeleteClick) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onDeleteClick} >
                  삭제
                </Button>
              </div>
            }
            {
              (onWorkGroupEdit) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={onWorkGroupEdit} >
                  수정
                </Button>
              </div>
            }
            {
              (onWorkGroupDelete) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onWorkGroupDelete} >
                  삭제
                </Button>
              </div>
            }

            {
              ((paramId ? paramId.length > 4 : false) && onRevise) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onRevise} >
                  수정 완료
                </Button>
              </div>
            }
            {/* 일지 작성 할때  화면에 보이는 버튼 */}
            {
              (!paramId && tempSaveClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={tempSaveClick} >
                  임시저장
                </Button>
              </div>
            }
            {
              (!paramId && onSaveClick) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onSaveClick} >
                  저장
                </Button>
              </div>
            }
            {/* 일지 작성 할때 임시저장함에서 임시저장 리스트 불러온 후 화면에 보이는 버튼 */}
            {
              ((paramId ? paramId.length < 3 : false) && tempSaveClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={tempSaveClick} >
                  임시저장
                </Button>
              </div>
            }
            {
              ((paramId ? paramId.length < 3 : false) && onSaveClick) &&
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

            // {/* (!paramId || paramId ? paramId.length < 3 : false) */}
