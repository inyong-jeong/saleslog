import React, { useState, useEffect, useRef, useCallback } from "react";
import CustomFab from "../../components/styledcomponent/CustomFab";
import styles from '../../components/customer/styles/Customer.module.css'
import MyAppBar from "../../components/styledcomponent/MyAppBar";
import { Input } from "antd";
import SelectFilter from "../../components/customer/SelectFilter";
import FullTabs from "../../components/styledcomponent/FullTabs";
import { useHistory } from "react-router-dom";
import CustomerItems from "../../components/customer/CustomerItems";
import { getUsers } from "../../redux/customer/actions";
import { useSelector, useDispatch } from "react-redux";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import CustomUp from "../../components/styledcomponent/CustomUpButton";
import { getAllCustomer } from '../../redux/customer/actions';

const { TabPane } = FullTabs;
const { Search } = Input;

const CustomerShow = () => {

  const history = useHistory()
  const navigateTo = () => history.push({
    pathname: '/main/customer/register'
  })
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)
  const [users, setUsers] = useState([])
  const scoreType = [{ '전체 등급/단계': '' }, { 'A': 'A' }, { 'B': 'B' }, { 'C': 'C' }, { 'D': 'D' }, { 'E': 'E' }, { 'F': 'F' }, { 'BLACK': 'BLACK' }]
  const stageType = [{ '전체 멤버': '' }, { '발굴': '발굴' }, { '접촉': '접촉' }, { '제안': '제안' }, { '검증': '검증' }]
  const emptyType = []
  const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState(state.customerStoredData ? state.customerStoredData.body : {
    srch: '',
    order: '',
    sales_gb: '',
    score: '',
    users: users,
    pageno: page,
  })

  const [tabkey, setTabKey] = useState('1')
  const [searchKeyword, setSearchKeyword] = useState(inputs.srch ? inputs.srch : '')
  const searchInput = useRef()
  useEffect(() => {
    dispatch(getUsers.call({ srch: '' }))
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })

  }, [])

  //디스패치 말아서 

  const loading = state.loading

  useEffect(() => {
    dispatch(getAllCustomer.call(inputs, 1))
  }, [])

  useEffect(() => {
    if (loading) return
    dispatch(getAllCustomer.call(inputs, page))
  }, [inputs, page])


  useEffect(() => {

    if (state.customerStoredData) {
      if (state.customerStoredData.body.sales_gb === '0010001') return setTabKey('2')
      if (state.customerStoredData.body.sales_gb === '0010002') return setTabKey('3')
      return setTabKey('1')
    }
  }, [state.customerStoredData])

  useEffect(() => {
    setUsers(state.userLists)
  }, [state.userListsResponse])

  const onTabChange = (key) => {
    switch (key) {
      case '2':
        setInputs({ ...inputs, sales_gb: '0010001', score: '' })
        setPage(1)

        break
      case '3':
        setInputs({ ...inputs, sales_gb: '0010002', score: '' })
        setPage(1)

        break
      default:
        setInputs({ ...inputs, sales_gb: '', score: '' })
        setPage(1)

    }
  }

  const onSearch = (keyword) => {
    keyword = keyword.trim()
    setInputs({ ...inputs, srch: keyword })
    setSearchKeyword(keyword)
    searchInput.current.blur()
    setPage(1)
  }

  const hadleChangeKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }

  return (
    <div>
      <MyAppBar barTitle={'고객'} />
      <div className='content_body'>
        <Search
          size='large'
          ref={searchInput}
          placeholder="고객 검색"
          allowClear
          onChange={hadleChangeKeyword}
          value={searchKeyword}
          onSearch={onSearch}
          style={{
            marginBottom: 10,
            marginTop: 10,
          }} />

        <FullTabs
          onChange={onTabChange}
          activeKey={tabkey} >
          <TabPane tab="전체" key="1" >
            <SelectFilter
              users={users}
              disabled={true}
              setInputs={setInputs}
              setPage={setPage}
              inputs={inputs}
              gradeType={emptyType}
            />
            <CustomerItems
              page={page}
              setPage={setPage}
              setInputs={setInputs}
            />
          </TabPane>

          <TabPane tab="거래고객" key="2">
            <SelectFilter
              users={users}
              setInputs={setInputs}
              gradeType={scoreType}
              setPage={setPage}
              inputs={inputs}
            />
            <CustomerItems
              page={page}
              setPage={setPage}
              setInputs={setInputs} />
          </TabPane>

          <TabPane tab="리드고객" key="3">
            <SelectFilter
              users={users}
              setPage={setPage}
              setInputs={setInputs}
              gradeType={stageType}
              inputs={inputs}
            />
            <CustomerItems
              page={page}
              setPage={setPage}
              setInputs={setInputs} />
          </TabPane>
        </FullTabs>

        <div className={styles.Wrapper}>
          <CustomFab navigateTo={navigateTo} />
        </div>
      </div>
    </div>
  );
}

export default CustomerShow;