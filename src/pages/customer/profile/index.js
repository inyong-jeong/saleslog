import React, { useState, useEffect } from 'react';
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import FullTabs from '../../../components/styledcomponent/FullTabs';
import CustomerProfilePage from '../../../components/customer/CustomerProfilePage';
import CustomerLogPage from '../../../components/customer/CustomerLogPage';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { base64Dec, base64Enc } from 'constants/commonFunc';
import { deleteCustomer } from '../../../redux/customer/actions';
import { useSelector } from 'react-redux';

const { TabPane } = FullTabs;
const CustomerDetail = () => {

  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)

  const [customerId, setCustomerId] = useState(null)
  const [managerId, setManagerId] = useState(null)
  const [managerPermission, setManagerPermission] = useState('N')

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
    setCustomerId(base64Dec(params.accId))
    params.managerId && setManagerId(base64Dec(params.managerId))

  }, [])

  const navigateTo = () => history.goBack()

  const onEditClick = () => {
    history.push(`/main/customer/edit/${base64Enc(customerId)}/${base64Enc(managerId)}`)
  }

  const deleteClick = () => {
    dispatch(deleteCustomer.call({ acc_idx: customerId }))
  }


  const onPermission = (value) => {
    setManagerPermission(value)
  }

  return (
    <div>
      {managerPermission === 'Y' ?
        <MyAppBar barTitle={'고객 프로필'}
          showBackButton
          navigateTo={navigateTo}
          onEditClick={onEditClick}
          deleteClick={deleteClick}
        /> :
        <MyAppBar barTitle={'고객 프로필'}
          showBackButton
          navigateTo={navigateTo}
        />
      }

      <div className='content_body'>
        <FullTabs defaultActiveKey="1" >
          <TabPane tab="프로필" key="1" >
            <CustomerProfilePage customerId={customerId} managerId={managerId} onPermission={onPermission} />
          </TabPane>
          <TabPane tab="일지" key="2">
            <CustomerLogPage customerId={customerId} />
          </TabPane>
        </FullTabs>
      </div>
    </div>);
}

export default CustomerDetail;