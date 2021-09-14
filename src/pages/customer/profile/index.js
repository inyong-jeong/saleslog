import React, { useState, useEffect } from 'react';
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import FullTabs from '../../../components/styledcomponent/FullTabs';
import CustomerProfilePage from '../../../components/customer/CustomerProfilePage';
import CustomerLogPage from '../../../components/customer/CustomerLogPage';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';

const { TabPane } = FullTabs;
const CustomerDetail = () => {

  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const [customerId, setCustomerId] = useState(null)
  const [managerId, setManagerId] = useState(null)

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
    setCustomerId(params.accId)
    setManagerId(params.managerId)
  }, [])


  const navigateTo = () => history.goBack()

  const onEditClick = () => {
    history.push(`/main/customer/edit/${customerId}/${managerId}`)
  }

  return (
    <div>
      <MyAppBar barTitle={'고객 프로필'}
        showBackButton
        navigateTo={navigateTo}
        onEditClick={onEditClick}
      />
      <div>
        <FullTabs defaultActiveKey="1" >
          <TabPane tab="프로필" key="1" >
            <CustomerProfilePage customerId={customerId} managerId={managerId} />
          </TabPane>
          <TabPane tab="일지" key="2">
            <CustomerLogPage customerId={customerId} />
          </TabPane>
        </FullTabs>
      </div>
    </div>);
}

export default CustomerDetail;