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
import { postNotificationBadge } from "../../redux/notification/actions";


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
  paramId,
  Dbutton,
  Ubutton,
  onWorkGroupEdit,
  onWorkGroupDelete,
  showThreeDots,
  onNeedsTrain,
  params
}) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const etcState = useSelector(state => state.Etc)
  const notiState = useSelector(state => state.Notification)
  const [badgeContent, setBadgeContent] = useState(0)

  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    if (showBackButton) return
    dispatch(getProfileDetail.call())
    dispatch(postNotificationBadge.call())

  }, [])

  useEffect(() => {
    if (etcState.getProfileDetailRes && etcState.getProfileDetailRes.length > 0) {

      setProfileImage(
        etcState.getProfileDetailRes[0].thumb_url
          ? cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + etcState.getProfileDetailRes[0].thumb_url
          : null
      )
    }
  }, [etcState.getProfileDetailRes])

  useEffect(() => {
    if (!notiState.isLoading && notiState.notiBadge) {
      setBadgeContent(notiState.notiBadge.noti_cnt)
    }

  }, [notiState.isLoading])

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
      title: '?????? ???????????? ???????????????????',
      icon: <ExclamationCircleOutlined />,
      cancelText: '??????',
      okText: '??????',
      onOk() {
        removeAll();
        window.location.reload()
        // history.push('/signin')
      }
    })

  }
  const onNotiClick = () => {
    history.push('/main/notification/lists')
  }

  const handleOnRoute = () => {
    history.push(`/main/manage/saleslog/needsedit/needslist/${params}`)
  }


  const handleBarTitleClick = () => {
    window.location.reload()
  }

  //profile menu 
  //warnKey error & keyEvent error??? link??? ????????? ????????? ??????
  // ?????? ???????????? ???????????? ?????? ???????????? 
  const menu = (
    <Menu onClick={onProfileClick} >

      <Menu.Item key="1">
        <Link to={'/main/etc/profile'}>
          <SmallPerson stroke='#333' /> ??? ?????????
        </Link>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item key="2">
        <Link to={'/main/etc/notice/group'}>
          <WorkNotice /> ???????????? ??????
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={'/main/etc/notice/system'}>
          <Notice /> ????????? ??????
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">
        <Link to={'/main/notification/setting'}>
          <Setting /> ?????? ??????
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to={'/main/support'}>
          <Support /> ????????????
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">
        <div onClick={onLogoutClick}>
          <Logout stroke="black" /> ????????????
        </div>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to={'/main/information'}>
          <Info /> ??????</Link>
      </Menu.Item>
    </Menu>
  )

  const dotsMenu = (
    <Menu>
      <Menu.Item key="1">
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={onEditClick}>
          <EditOutlined /> &nbsp; ??????
        </div>

      </Menu.Item>
      <Menu.Item key="2">
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={onDeleteClick}>
          <DeleteOutlined /> &nbsp;  ??????
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

            {(onNeedsTrain && !isMobile) &&

              <div className={classes.appBarIcon}>
                <Button size='large' onClick={handleOnRoute} style={{ border: '1px solid #f0f0f0' }}>?????? ?????? ??????</Button>
              </div>

            }

            {(onNeedsTrain && isMobile) &&

              <div className={classes.appBarIcon}>
                <Button size='large' onClick={handleOnRoute} style={{ border: '1px solid #f0f0f0', color: 'white' }}>?????? ?????? ??????</Button>
              </div>

            }

            {
              (Ubutton === 'Y' && onEditClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={onEditClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ??????
                </Button>
              </div>
            }
            {
              (Dbutton === 'Y' && onDeleteClick) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onDeleteClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ??????
                </Button>
              </div>
            }
            {
              (onWorkGroupEdit) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={onWorkGroupEdit} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ??????
                </Button>
              </div>
            }
            {
              (onWorkGroupDelete) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onWorkGroupDelete} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ??????
                </Button>
              </div>
            }

            {
              ((paramId ? paramId.length > 4 : false) && onRevise) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onRevise} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ?????? ??????
                </Button>
              </div>
            }
            {/* ?????? ?????? ??????  ????????? ????????? ?????? */}
            {
              (!paramId && tempSaveClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={tempSaveClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ????????????
                </Button>
              </div>
            }
            {
              (!paramId && onSaveClick) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onSaveClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ??????
                </Button>
              </div>
            }
            {/* ?????? ?????? ?????? ????????????????????? ???????????? ????????? ????????? ??? ????????? ????????? ?????? */}
            {
              ((paramId ? paramId.length < 3 : false) && tempSaveClick) &&
              <div className={classes.tempButtonStyle}>
                <Button size="small" onClick={tempSaveClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ????????????
                </Button>
              </div>
            }
            {
              ((paramId ? paramId.length < 3 : false) && onSaveClick) &&
              <div className={classes.textButtonStyle}>
                <Button size="small" onClick={onSaveClick} style={{ color: isMobile ? '#fff' : '#000' }}>
                  ??????
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
