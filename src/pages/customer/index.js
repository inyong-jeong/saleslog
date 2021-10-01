import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router";
import CustomUp from "../../components/styledcomponent/CustomUpButton";

const { TabPane } = FullTabs;
const { Search } = Input;
const CustomerShow = () => {

  const history = useHistory()
  const location = useLocation()
  const navigateTo = () => history.push({
    pathname: '/main/customer/register'
  })
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)

  useEffect(() => {
    dispatch(getUsers.call({ srch: '' }))
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })

  }, [])

  useEffect(() => {
    setUsers(state.userLists)
  }, [state.userListsResponse])

  //옵션 사원들 가져오기
  const [users, setUsers] = useState([])
  const scoreType = [{ '전체': '' }, { 'A': 'A' }, { 'B': 'B' }, { 'C': 'C' }, { 'D': 'D' }, { 'E': 'E' }, { 'F': 'F' }, { 'BLACK': 'BLACK' }]
  const stageType = [{ '발굴': '발굴' }, { '접촉': '접촉' }, { '제안': '제안' }, { '검증': '검증' }]
  const emptyType = []

  const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState({
    srch: '',
    order: '',
    sales_gb: '',
    score: '',
    users: '',
    pageno: page,
  })

  //tab
  const onTabChange = (key) => {
    switch (key) {
      case '2':
        setInputs({ ...inputs, sales_gb: '0010001' })
        setPage(1)
        break
      case '3':
        setInputs({ ...inputs, sales_gb: '0010002' })
        setPage(1)
        break
      default:
        setInputs({ ...inputs, sales_gb: '' })
        setPage(1)
    }
  }

  const onSearch = (keyword) => {
    keyword = keyword.trim()
    setInputs({ ...inputs, srch: keyword })
    setPage(1)
  }

  return (
    <div>
      <MyAppBar barTitle={'고객'} />
      <div className='content_body'>
        <Search
          placeholder="고객 검색"
          allowClear
          onSearch={onSearch}
          style={{
            width: '100%',
            marginBottom: 10,
            marginTop: 10,
          }} />

        <FullTabs defaultActiveKey="1" onChange={onTabChange} >
          <TabPane tab="전체" key="1" >
            <SelectFilter
              users={users}
              setPage={setPage}
              disabled={true}
              setInputs={setInputs}
              inputs={inputs}
              gradeType={emptyType}
            />
            <CustomerItems
              page={page}
              setPage={setPage}
              setInputs={setInputs}
              inputs={inputs}
            />
          </TabPane>

          <TabPane tab="거래고객" key="2">
            <SelectFilter
              users={users}
              setPage={setPage}
              setInputs={setInputs}
              gradeType={scoreType}
              inputs={inputs}
            />
            <CustomerItems
              page={page}
              setPage={setPage}
              setInputs={setInputs}
              inputs={inputs} />
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
              setInputs={setInputs}
              inputs={inputs} />
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