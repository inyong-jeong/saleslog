import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col, Divider } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useDispatch, useSelector } from 'react-redux'
import { SET_NAVIBAR_SHOW, STORE_DATA } from 'constants/actionTypes';

import LogList from 'components/LogList'
import SalesLogFilter from 'components/SalesLogFilter';
import LeadLogFilter from 'components/LeadLogFilter';
import { connect } from 'react-redux';
import FullTabs from "components/styledcomponent/FullTabs";
import History from 'components/search/history.js'
import SearchBar from 'components/search/searchbar.js'
import {
  getLogLists, getLogList, searchLogList,
  putSalesLog, putFile, deleteFile
} from 'redux/actions';
import MyAppBar from '../../components/styledcomponent/MyAppBar';
import CustomFab from '../../components/styledcomponent/CustomFab';
import { useHistory, useLocation } from 'react-router-dom';
import { getUserInfo, getpersist } from 'helpers/authUtils';



const { TabPane } = Tabs;
function SalesLogList(props) {
  const state = useSelector(state => state.SalesLog)
  const Ostate = useSelector(state => state.Organization)

  // let StoredData = state.StoredData;
  // let StoredData = state.StoredData;

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })

  }, [])

  const history = useHistory();
  const location = useLocation();

  console.log(history);
  console.log(props);

  const navigateTo = () => history.push({
    pathname: '/main/upload'
  })

  const [loglists, setLogLists] = useState([]);
  const [tabkey, setTabKey] = useState('0010001');
  const [firsttime, setFirsttime] = useState(true);
  const [Secondtime, setSecondtime] = useState(false);

  const [data, setData] = useState(state.StoredData ? state.StoredData.data : {
    log_gb: tabkey,
    sales_man: '',
    sales_lead_gb: '',
    sales_goal: '',
    sales_activity: '',
    accts: '',
    accts_man: '',
    pageno: 1,
    srch: '',
    need_cod: '',
    // extra: ''
  })

  console.log(data);

  useEffect(() => {
    if (state.StoredData) {
      setTabKey(state.StoredData.data.log_gb);
    }
  }, [state.StoredData])
  // 권한에 따른 dispatch call

  useEffect(() => {
    if (!firsttime) {

      props.getLogLists(data)
    }
  }, [data])

  useEffect(() => {
    setFirsttime(false);
    if (getUserInfo().permission === '9') {
      props.getLogLists(data)
    }
  }, [])

  console.log(data);
  // 데이터 받아 온 것 set
  useEffect(() => {
    if (props.loglist && !props.loadLogsLoading) {
      if (data.pageno === 1) {
        return setLogLists(props.loglist)
      }
      setLogLists(loglists.concat(props.loglist))
    }
  }, [props.loadLogsLoading])


  const handleNextPage = () => {
    if (props.loglistcount >= loglists.length) {
      if (props.loadLogsLoading === true) return
      data.pageno = data.pageno + 1
      setData({ ...data, 'pageno': data.pageno })
    }
  }

  // tab 바뀔 때 sets
  const onTabChange = (key) => {
    switch (key) {
      case '0010001':
        setTabKey('0010001')
        setData({ ...data, log_gb: '0010001', sales_lead_gb: '', pageno: 1 })
        break
      case '0010002':
        setTabKey('0010002')
        setData({ ...data, log_gb: '0010002', pageno: 1 })
        break
      default:
        setData({ ...data, log_gb: '', pageno: 1 })
    }
  }

  //검색어 기능 구현
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]'),
  )

  //검색어
  const [searchStr, setSearchStr] = useState('')
  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])


  //검색어 추가
  const handleAddKeyword = (text, focus) => {
    const newKeyword = {
      id: Date.now(),
      text: text,
    }
    setKeywords([newKeyword, ...keywords])
    setData({ ...data, srch: text, pageno: 1 })
  }

  //검색어 삭제
  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id !== id
    })
    setKeywords(nextKeyword)
  }

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([])
  }

  //최근검색어 display
  const [word, setWord] = useState('')
  const [focus, setFocus] = useState(false)
  const onSearch = (keyword) => {
    console.log(keyword)
    if (keyword) {
      setFocus(keyword)
      setWord(keyword)
    } else {
      return setFocus(false);
    }
  }

  const onEnter = (v) => {
    setFocus(v);
  }
  const onBlankEnter = (v) => {
    if (v === '') {
      setData({ ...data, srch: '', pageno: 1 })
    }
  }

  const clearKeyword = () => {
    console.log('clear Keyword:::::::::::::')
    setSearchStr('')
  }

  const setKeyword = (v) => {
    console.log('click:::::::::::::', v)
    setSearchStr(v)
  }
  //페이지 넘길때 데이터 저장


  return (
    <>
      <MyAppBar barTitle={'일지'} />

      <div className='content_body'>
        {/* <Row>
        <Col md={24} lg={24} xs={24}> */}
        <SearchBar searchStr={searchStr}
          word={state.StoredData && state.StoredData.data.srch}
          onAddKeyword={handleAddKeyword}
          SearchChange={onSearch}
          SearchEnter={onEnter}
          BlankEnter={onBlankEnter}
          clearKeyword={clearKeyword} />
        {focus && <History
          historyKeyword={setKeyword}
          keywords={keywords}
          onClearKeywords={handleClearKeywords}
          onRemoveKeyword={handleRemoveKeyword}
        />}

        <Row>
          <Col sm={24} xs={24} md={24} lg={24} >
            <FullTabs type='line' defaultActiveKey="0010001" onChange={onTabChange} activeKey={tabkey}>

              <TabPane tab="영업일지" key="0010001">
                <SalesLogFilter data={data} setData={setData} firsttime={firsttime} />
                <div className='mt-3 ml-2'>
                  <Text style={{ fontSize: 12, fontWeight: 500 }} ><span style={{ color: '#000fff' }}>{props.loglistcount ? props.loglistcount : 0}</span> 개의 일지</Text>
                </div>
                <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0, borderWidth: '5px' }} />

                {loglists.map((v) => (
                  <LogList key={v.slog_idx}
                    data={data}
                    loglist={v}
                    tabkey={tabkey}
                    handleNextPage={handleNextPage}
                    loglists={loglists} />
                ))
                }
              </TabPane>
              <TabPane tab="리드일지" key="0010002">
                <LeadLogFilter key={'leadlog'} id={'leadlog'} data={data} setData={setData} />
                <div className='mt-3 ml-2'>
                  <Text style={{ fontSize: 12, fontWeight: 500 }} ><span style={{ color: '#000fff' }}>{props.loglistcount ? props.loglistcount : 0}</span> 개의 일지</Text>
                </div>
                <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0, borderWidth: '5px' }} />
                {loglists.map((v) => (
                  <LogList key={v.slog_idx}
                    data={data}
                    loglist={v}
                    tabkey={tabkey}
                    handleNextPage={handleNextPage}
                    loglists={loglists} />
                ))
                }
              </TabPane>
            </FullTabs>

          </Col>
        </Row>
        <Row>
          <div>
            <CustomFab navigateTo={navigateTo} />
          </div>
        </Row>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { loglist, loadLogsLoading, searchloglist, loadSearchsLoading, loglistcount } = state.SalesLog;
  // const { organlistResponse, organuserResponse } = state.Organization;
  return { loglist, loadLogsLoading, searchloglist, loadSearchsLoading, loglistcount };
};

const mapStateToDispatch = {
  getLogLists: getLogLists.call,
  getLogList: getLogList.call,
  searchLogList: searchLogList.call,
  putSalesLog: putSalesLog.call,
  putFile: putFile.call,
  deleteFile: deleteFile.call
}


export default connect(mapStateToProps, mapStateToDispatch)(SalesLogList);


