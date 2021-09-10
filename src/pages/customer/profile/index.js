import React, { useState } from 'react';
import MyNavigation from '../../../components/styledcomponent/ MyNavigation';
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import FullTabs from '../../../components/styledcomponent/FullTabs';
import CustomerProfilePage from '../../../components/customer/CustomerProfilePage';
import CustomerLogPage from '../../../components/customer/CustomerLogPage';
import { useSelector } from 'react-redux';
const { TabPane } = FullTabs;
const CustomerDetail = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });
  const history = useHistory()
  const state = useSelector(state => state.Customer)

  const navigateTo = () => history.push('/main/customer')

  const onEditClick = () => {

    history.push({
      pathname: '/main/customer/edit',
      state: {
        editMode: true
      }
    })
  }

  return (
    <div>
      {isMobile && <MyAppBar barTitle={'고객 프로필'}
        showBackButton
        navigateTo={navigateTo}
        onEditClick={onEditClick}
      />}
      <div>
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