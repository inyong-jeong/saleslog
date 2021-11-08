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
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { SET_LAST_TAB } from '../../../constants/actionTypes';
import { useScrollToTop } from '../../../constants/commonFunc';
const { confirm } = Modal
const { TabPane } = FullTabs;

const CustomerDetail = () => {

  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)

  const [customerId, setCustomerId] = useState(null)
  const [managerId, setManagerId] = useState(null)
  const [managerPermission, setManagerPermission] = useState('N')
  const [activeTabKey, setactiveTabKey] = useState(state.tabStoreData ? state.tabStoreData : '1')

  useScrollToTop()
  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
    setCustomerId(base64Dec(params.accId))
    params.managerId && setManagerId(base64Dec(params.managerId))
  }, [])

  useEffect(() => {
    if (state.deleteCustomerRepsonse) {
      history.push({ pathname: '/main/customer', state: 'needReload' });
    }

  }, [state.deleteCustomerRepsonse])

  useEffect(() => {
    dispatch({
      type: SET_LAST_TAB,
      payload: activeTabKey
    })
  }, [activeTabKey])

  const navigateTo = () => {
    //clearCache();
    setactiveTabKey('1')
    return history.goBack()
  }

  const onEditClick = () => {
    history.push(`/main/customer/edit/${base64Enc(customerId)}/${base64Enc(managerId)}`)
  }

  const onDeleteClick = () => {
    confirm({
      title: '해당 고객사를 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      cancelText: '취소',
      okText: '확인',
      onOk() {
        dispatch(deleteCustomer.call({ acc_idx: customerId }))

      }
    })
  }
  const onPermission = (value) => {
    setManagerPermission(value)
  }

  const onTabChange = (key) => {
    setactiveTabKey(key)
  }
  return (
    <div>
      <MyAppBar barTitle={'고객 프로필'}
        showThreeDots={managerPermission === 'Y' ? 'Y' : 'N'}
        showBackButton
        navigateTo={navigateTo}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      //Dbutton={managerPermission === 'Y' ? 'Y' : 'N'}
      //Ubutton={managerPermission === 'Y' ? 'Y' : 'N'}
      />

      <div className='content_body'>
        <FullTabs activeKey={activeTabKey} onChange={onTabChange}>
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