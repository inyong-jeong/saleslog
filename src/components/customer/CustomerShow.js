import React, { useState, useEffect } from "react";
import CustomFab from './button/CustomFab';
import styles from './styles/Customer.module.css'
import MyAppBar from "../../components/styledcomponent/MyAppBar";
import { useMediaQuery } from "react-responsive";
import { Input } from "antd";
import SelectFilter from "./SelectFilter";
import FullTabs from "../styledcomponent/FullTabs";
import { useHistory } from "react-router-dom";
import CustomerItems from "./CustomerItems";
import { getUsers } from "../../redux/customer/actions";
import { useSelector, useDispatch } from "react-redux";

const { TabPane } = FullTabs;
const { Search } = Input;

const CustomerShow = () => {
  const history = useHistory()
  const navigateTo = () => history.push('/main/customer/register')
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)

  useEffect(() => {
    dispatch(getUsers.call({ srch: '' }))
  }, [])
  //tablet & mobile 
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  useEffect(() => {
    setUsers(state.userLists)
  }, [state.userListsResponse])

  //옵션 사원들 가져오기
  const [users, setUsers] = useState([])
  const scoreType = [{ 'A': 'A' }, { 'B': 'B' }, { 'C': 'C' }, { 'D': 'D' }, { 'E': 'E' }, { 'F': 'F' }, { 'BLACK': 'BLACK' }]
  const stageType = [{ '발굴': '발굴' }, { '접촉': '접촉' }, { '제안': '제안' }, { '검증': '검증' }]
  const emptyType = []

  const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState({
    srch: '',
    order: '',
    sales_gb: '',
    score: '',
    users: '',
    pageno: 1,
  })

  //tab
  const onTabChange = (key) => {
    switch (key) {
      case '2':
        setInputs({ ...inputs, sales_gb: '001001' })
        setPage(1)
        break
      case '3':
        setInputs({ ...inputs, sales_gb: '001002' })
        setPage(1)
        break
      default:
        setInputs({ ...inputs, sales_gb: '' })
        setPage(1)
    }
  }

  const onSearch = (keyword) => {
    setInputs({ ...inputs, srch: keyword })
    setPage(1)
  }

  return (
    <div style={{ paddingLeft: 5, paddingRight: 5, }}>
      {isMobile && <MyAppBar barTitle={'고객'} />}
      <Search
        placeholder="고객 검색"
        allowClear
        onSearch={onSearch}
        style={{
          width: '100%',
          marginBottom: 10,
          marginTop: 10,
          borderColor: '#000'
        }} />
      <>
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
      </>
      <div className={styles.Wrapper}>
        <CustomFab navigateTo={navigateTo} />
      </div>
    </div>
  );
}

export default CustomerShow;