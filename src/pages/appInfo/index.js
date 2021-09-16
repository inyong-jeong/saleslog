import React from 'react'
import MyAppBar from '../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import FullTabs from '../../components/styledcomponent/FullTabs';

const { TabPane } = FullTabs;
const AppInfo = () => {
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
        showBackButton
        navigateTo={navigateTo}
      />
      <FullTabs defaultActiveKey="1" onChange={onTabChange} >
        <TabPane tab='서비스 이용약관' key='1'>

        </TabPane>
        <TabPane tab='개인정보 처리방침' key='2'></TabPane>
        <TabPane tab='위치서비스 약관' key='3'></TabPane>
      </FullTabs>
    </>
  );
}

export default AppInfo;