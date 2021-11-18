import React, { useState, useEffect } from 'react'
import { Badge, IconButton } from '@material-ui/core';
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'
import { ReactComponent as Noti } from '../.././assets/icons/noti.svg'
import { ReactComponent as Person } from '../.././assets/icons/person.svg'
import { ReactComponent as SmallPerson } from '../.././assets/icons/log/person.svg'
import { ReactComponent as Logout } from '../.././assets/icons/main/logout.svg'
import { ReactComponent as Info } from '../.././assets/icons/info_black.svg'
import { ReactComponent as Notice } from '../.././assets/icons/main/notice.svg'
import { ReactComponent as Support } from '../.././assets/icons/main/support.svg'
import { ReactComponent as WorkNotice } from '../.././assets/icons/main/notice_workgroup.svg'
import { ReactComponent as Setting } from '../.././assets/icons/main/setting.svg'
import { removeAll } from 'helpers/authUtils';
import { useHistory } from 'react-router';
import { Menu, Dropdown, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cmm from 'constants/common';
import { useSelector, useDispatch } from 'react-redux';
import { postNotificationBadge } from '../../redux/notification/actions';

const { confirm } = Modal;
export default function TopMenu() {

  const history = useHistory()
  const etcState = useSelector(state => state.Etc)
  const dispatch = useDispatch()
  const notiState = useSelector(state => state.Notification)
  const [badgeContent, setBadgeContent] = useState(0)
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
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

  const onLogoutClick = () => {
    confirm({
      title: '정말 로그아웃 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      cancelText: '취소',
      okText: '확인',
      onOk() {
        removeAll();
        window.location.reload()
        // history.push('/signin')
      },
      onCancel() {
        //취소
      },
    })

  }

  const onProfileClick = e => {

  }

  //profile menu 
  const menu = (
    <Menu onClick={onProfileClick}>

      <Menu.Item key="1">
        <Link to={'/main/etc/profile'}>
          <SmallPerson stroke='#333' />내 프로필
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Link to={'/main/etc/notice/group'}>
          <WorkNotice />워크그룹 공지
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={'/main/etc/notice/system'}>
          <Notice />시스템 공지
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5">
        <Link to={'/main/support'}>
          <Support />지원센터
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">
        <Link to={'/main/information'}>
          <Info />
          정보</Link>
      </Menu.Item>
    </Menu>
  );


  const onLogoClick = () => {
    history.push('/main/manage')
  }
  const onNotiClick = () => {
    history.push('/main/notification/lists')
  }

  return (
    <>
      <div style={{
        height: 64,
        backgroundColor: '#000',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        borderBottom: 'solid',
        borderColor: '#dfdfdf',
        borderWidth: 1
      }}>
        <div style={{ width: 1190, display: 'flex', }}>
          <div style={{
            width: 180,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
            onClick={onLogoClick}
          >
            <WhiteLogo width={100} height={64} fill='white' />
          </div>
          <div style={{
            width: 1010,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <div>
              <IconButton color="inherit" onClick={onNotiClick}>
                <Badge badgeContent={badgeContent} color="secondary">
                  <Noti stroke='white' />
                </Badge>
              </IconButton>
            </div>
            <div>
              <Dropdown overlay={menu}>
                <IconButton>
                  {profileImage ?
                    <Avatar
                      src={profileImage}
                      size={20}
                    />
                    :
                    <Person stroke='white' />
                  }
                </IconButton>
              </Dropdown>
            </div>
            <div>
              <IconButton color="inherit" onClick={onLogoutClick}>
                <Logout stroke="white" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
