import React, { useEffect } from 'react'
import MyAppBar from '../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import FullTabs from '../../components/styledcomponent/FullTabs';
import Serviceinfo from './info';
import PrivacyPolicy from './privacy';
import { useDispatch } from 'react-redux';
import { SET_NAVIBAR_SHOW } from '../../constants/actionTypes';
const { TabPane } = FullTabs;
const AppInfo = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
  }, [])
  const history = useHistory()
  const navigateTo = () => {
    history.goBack()
  }
  const onTabChange = () => {
  }

  return (
    <>
      <MyAppBar
        barTitle='앱 정보'
        navigateTo={navigateTo}
      />
      <div className='content_body'>
        <FullTabs defaultActiveKey="1" onChange={onTabChange} >
          <TabPane tab='서비스 이용약관' key='1'>
            <Serviceinfo />
          </TabPane>
          <TabPane tab='개인정보처리방침' key='2'>
            <PrivacyPolicy />
          </TabPane>
          {/* <TabPane tab='위치서비스 약관' key='3'></TabPane> */}
        </FullTabs>
      </div>
    </>
  );
}

export default AppInfo;