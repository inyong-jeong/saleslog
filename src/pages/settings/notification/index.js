import React from 'react'
import { useHistory } from 'react-router';
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { Divider, Switch } from 'antd';

const NotificationSetting = () => {
  //알림 설정은 모바일에서만 할수있다는 창 필요할듯

  const history = useHistory()

  const navigateTo = () => {
    history.goBack()
  }
  const onChange = (checked) => {
    console.log('알림 ::::', checked)
  }
  return (
    <>
      <MyAppBar
        barTitle='알림 설정'
        //  showBackButton
        navigateTo={navigateTo}
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
          }}>알람을 끄면 모든 알림음이 울리지 않습니다. </p>
        </div>
      </div>
      <Divider />

    </>
  );
}

export default NotificationSetting;