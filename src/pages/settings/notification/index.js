import React, { useEffect } from 'react'
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { Divider, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postNotificationSetting } from '../../../redux/notification/actions';
import { getProfileDetail } from 'redux/etc/actions';
import { useState } from 'react';

const NotificationSetting = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.Etc)
  const [alarmStatus, setAlarmStatus] = useState(false)

  useEffect(() => {
    dispatch(getProfileDetail.call())
  }, [])

  useEffect(() => {
    if (state.getProfileDetailRes) {
      if (state.getProfileDetailRes[0].alarm_yn === 'Y') return setAlarmStatus(true)
      return setAlarmStatus(false)
    }
  }, [state.getProfileDetailRes])

  const onChange = (checked) => {

    if (checked === true) {
      setAlarmStatus(true)
      dispatch(postNotificationSetting.call({ alarm_yn: 'Y' }))
      return
    }
    setAlarmStatus(false)
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
            <Switch
              checked={alarmStatus}
              size="small"
              onChange={onChange} />
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