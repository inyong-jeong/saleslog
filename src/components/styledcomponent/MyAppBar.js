import {
  Badge, Toolbar, Typography,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useMediaQuery } from "react-responsive";
import { Divider, Avatar } from 'antd';
import { ReactComponent as Noti } from '../.././assets/icons/noti.svg'
import { ReactComponent as Info } from '../.././assets/icons/info_black.svg'
import { ReactComponent as Person } from '../.././assets/icons/person.svg'
import { ReactComponent as SmallPerson } from '../.././assets/icons/log/person.svg'
import { ReactComponent as Logout } from '../.././assets/icons/main/logout.svg'
import { ReactComponent as BackIcon } from '../.././assets/icons/back.svg'
import { ReactComponent as AddIcon } from '../.././assets/icons/plus.svg'
import { ReactComponent as Notice } from '../.././assets/icons/main/notice.svg'
import { ReactComponent as Support } from '../.././assets/icons/main/support.svg'
import { ReactComponent as WorkNotice } from '../.././assets/icons/main/notice_workgroup.svg'
import { ReactComponent as Setting } from '../.././assets/icons/main/setting.svg'
import { ReactComponent as MoreIcon } from '../.././assets/icons/main/menudots.svg'
import { Menu, Dropdown, } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { removeAll } from 'helpers/authUtils';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cmm from '../../constants/common';
import { getProfileDetail } from '../../redux/etc/actions';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { confirm } = Modal;

const MyAppBar = ({
  barTitle,
  showBackButton,
  showAddButton,
  navigateTo,
  onEditClick,
  onSaveClick,
  onDeleteClick,
  onAddClick,
  // onNotiClick,
  onRevise,
  tempSaveClick,
  navigateNext,
  badgeContent,
  paramId,
  Dbutton,
  Ubutton,
  onWorkGroupEdit,
  onWorkGroupDelete,
  showThreeDots,
}) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const state = useSelector(state => state.Etc)
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    dispatch(getProfileDetail.call())
  }, [])

  useEffect(() => {
    if (state.getProfileDetailRes && state.getProfileDetailRes.length > 0) {

      setProfileImage(
        state.getProfileDetailRes[0].thumb_url
          ? cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + state.getProfileDetailRes[0].thumb_url
          : null
      )

    }
  }, [state.getProfileDetailRes])

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  const useStyles = makeStyles({
    appBarIcon: {
      position: 'absolute',
      right: 10,
    },
    textButtonStyle: {
      position: 'absolute',
      right: 10,
    },

    dotsStyle: {
      position: 'absolute',
      right: 15,
    },
    tempButtonStyle: {
      position: 'absolute',
      right: 80,
    },
  })
  const classes = useStyles()

  const onProfileClick = (e) => {

  }

  const onLogoutClick = () => {
    confirm({
      title: '정말 로그아웃 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      cancelText: '취소',
      okText: '확인',
      onOk() {
        removeAll();
        history.push('/signin')
      }
    })

  }
  const onNotiClick = () => {
    history.push('/main/notification/lists')
  }

  const handleBarTitleClick = () => {
    window.location.reload()
  }

  //profile menu 
  //warnKey error & keyEvent error는 link로 감싸서 생기는 문제
  // 안에 키값으로 이동하는 걸로 바꿔야됨 
  const menu = (
    <Menu onClick={onProfileClick} >

      <Menu.Item key="1">
        <Link to={'/main/etc/profile'}>
          <SmallPerson stroke='#333' /> 내 프로필
        </Link>
      </Menu.Item>

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
        <Link to={'/main/notification/setting'}>
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
  )

  const dotsMenu = (
    <Menu>
      <Menu.Item key="1">
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={onEditClick}>
          <EditOutlined /> &nbsp; 수정
        </div>

      </Menu.Item>
      <Menu.Item key="2">
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={onDeleteClick}>
          <DeleteOutlined /> &nbsp;  삭제
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isMobile ? '#000' : '#fff'
      }}
    >
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
                <BackIcon stroke={isMobile ? '#fff' : '#000'} />
              </IconButton>

            }
            {
              isMobile && !showBackButton &&
              <div className={classes.appBarIcon}>
                <IconButton color="inherit" onClick={onNotiClick}>
                  <Badge badgeContent={badgeContent} color="secondary">
                    <Noti stroke={isMobile ? '#fff' : '#333'} />
                  </Badge>
                </IconButton>
                <Dropdown
                  trigger="click"
                  overlay={menu}>
                  <IconButton color="inherit">
                    {profileImage ?
                      <Avatar
                        src={profileImage}
                        size={30}
                      />
                      :
                      <Person stroke={isMobile ? '#fff' : '#333'} />
                    }
                  </IconButton>
                </Dropdown>
              </div>
            }
            {
              showAddButton &&
              <div className={classes.appBarIcon}>
                <IconButton color="inherit" onClick={onAddClick}>
                  <AddIcon stroke={isMobile ? '#fff' : '#333'} />
                </IconButton>
              </div>
            }

            {showThreeDots === 'Y' &&
              <div className={classes.dotsStyle}>
                <Dropdown
                  placement={'bottomCenter'}
                  trigger="click"
                  overlay={dotsMenu}
                >
                  <IconButton color="inherit">
                    <MoreIcon fill={isMobile ? '#fff' : '#333'} />
                  </IconButton>
                </Dropdown>
              </div>
            }

            {
              (Ubutton === 'Y' && onEditClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={onEditClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  수정
                </Button>
              </div>
            }
            {
              (Dbutton === 'Y' && onDeleteClick) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onDeleteClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  삭제
                </Button>
              </div>
            }
            {
              (onWorkGroupEdit) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={onWorkGroupEdit} style={{ color: isMobile ? '#fff' : '#000' }}>
                  수정
                </Button>
              </div>
            }
            {
              (onWorkGroupDelete) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onWorkGroupDelete} style={{ color: isMobile ? '#fff' : '#000' }}>
                  삭제
                </Button>
              </div>
            }

            {
              ((paramId ? paramId.length > 4 : false) && onRevise) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onRevise} style={{ color: isMobile ? '#fff' : '#000' }}>
                  수정 완료
                </Button>
              </div>
            }
            {/* 일지 작성 할때  화면에 보이는 버튼 */}
            {
              (!paramId && tempSaveClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={tempSaveClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  임시저장
                </Button>
              </div>
            }
            {
              (!paramId && onSaveClick) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onSaveClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  저장
                </Button>
              </div>
            }
            {/* 일지 작성 할때 임시저장함에서 임시저장 리스트 불러온 후 화면에 보이는 버튼 */}
            {
              ((paramId ? paramId.length < 3 : false) && tempSaveClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={tempSaveClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  임시저장
                </Button>
              </div>
            }
            {
              ((paramId ? paramId.length < 3 : false) && onSaveClick) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onSaveClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  저장
                </Button>
              </div>
            }


            <Typography variant="h6"
              onClick={handleBarTitleClick}
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: isMobile ? '#fff' : '#000'
              }}>
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
