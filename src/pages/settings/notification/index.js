import React from 'react'
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { Divider, Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { postNotificationSetting } from '../../../redux/notification/actions';

const NotificationSetting = () => {

  const dispatch = useDispatch()
  const onChange = (checked) => {

    if (checked === true) {
      dispatch(postNotificationSetting.call({ alarm_yn: 'Y' }))
      return
    }
    dispatch(postNotificationSetting.call({ alarm_yn: 'N' }))

  }
  return (
    <>
      <MyAppBar
        barTitle='알림 설정'
      />

      <div className='content_body'>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, paddingLeft: 5, fontSize: 14, color: '#111' }}>알림 모드</p>
          <div style={{ display: 'flex', alignItems: 'center', margin: 0, paddingLeft: 5, }}>
            <Switch size="small" onChange={onChange} />
          </div>
          <p style={{
            fontSize: '12',
            color: '#666666',
            paddingLeft: 5,
            margin: 0,
            flexBasis: '100%'
          }}>알람을 끄면 모든 알림이 뜨지 않습니다. </p>
        </div>
      </div>
      <Divider />

    </>
  );
}

export default NotificationSetting;