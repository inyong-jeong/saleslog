import React, { useState } from 'react';
import MyNavigation from '../../../components/styledcomponent/ MyNavigation';
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import FullTabs from '../../../components/styledcomponent/FullTabs';
import CustomerProfilePage from '../../../components/customer/CustomerProfilePage';
import CustomerLogPage from '../../../components/customer/CustomerLogPage';
const { TabPane } = FullTabs;

const CustomerDetail = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });
  const history = useHistory()
  const navigateTo = () => history.push('/main/customer')

  return (
    <div>
      {isMobile && <MyAppBar barTitle={'고객 프로필'} showBackButton navigateTo={navigateTo} />}
      <div style={{ paddingLeft: 5, paddingRight: 5, }}>
        <FullTabs defaultActiveKey="1" >
          <TabPane tab="프로필" key="1" >
            <CustomerProfilePage />
          </TabPane>
          <TabPane tab="일지" key="2">
            <CustomerLogPage />
          </TabPane>
        </FullTabs>
      </div>
      {/* {isMobile && <MyNavigation />} */}
    </div>);
}

export default CustomerDetail;