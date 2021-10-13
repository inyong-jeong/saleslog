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


const { TabPane } = Tabs;
function SalesLogList(props) {
  const state = useSelector(state => state.SalesLog)
  let StoredData = state.StoredData;
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
  console.log(location);



  const navigateTo = () => history.push({
    pathname: '/main/upload'
  })

  const [loglists, setLogLists] = useState([]);
  const [tabkey, setTabKey] = useState('0010001');
  const [data, setData] = useState({
    log_gb: '0010001',
    sales_man: '',
    sales_lead_gb: '',
    sales_goal: '',
    sales_activity: '',
    accts: '',
    accts_man: '',
    pageno: 1,
    srch: '',
    need_cod: ''
  })

  console.log(data);

  // 처음 업로드 될 때 dispatch, data 바뀔 때 call


  useEffect(() => {
    props.getLogLists(data)
  }, [data])

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
      case '2':
        setTabKey('0010001')
        setData({ ...data, log_gb: '0010001', pageno: 1 })
        break
      case '3':
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



  console.log(keywords);
  console.log(searchStr);
  console.log(props.searchKeyWord);
  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])


  //검색어 추가
  const handleAddKeyword = (text, focus) => {
    console.log(focus)
    console.log('text', text)
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
  const [click, setClick] = useState()
  const onSearch = (keyword) => {
    console.log(keyword)
    if (keyword) {
      setFocus(keyword)
      setWord(keyword)
    } else {
      return setFocus(false);
    }
  }

  console.log(word);


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

  const [RealData, setRealData] = useState()
  useEffect(() => {
    return () => {
      console.log('페이지 변환', data)
      dispatch({
        type: STORE_DATA,
        payload: [RealData, loglists, word, tabkey]
      })
    }
  }, [])

  useEffect(() => {
    // Data = data
    setRealData(data)

  }, [props])
  // useEffect(() => {
  //   setData(state.)
  // }
  // ,[])


  return (
    <>
      <MyAppBar barTitle={'일지'} />

      <div className='content_body'>
        {/* <Row>
        <Col md={24} lg={24} xs={24}> */}
        <SearchBar searchStr={searchStr}
          word={state.StoredData && state.StoredData.word}
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
        {/* </Col>
      </Row> */}
        <Row>
          <Col sm={24} xs={24} md={24} lg={24} >
            <FullTabs type='line' defaultActiveKey="2" onChange={onTabChange}>
              {/* <TabPane tab="전체" key="1">
              <SalesLogFilter data={data} setData={setData} />
              {loglists.map((v) => (
                <LogList key={v.slog_idx}
                  loglist={v}
                  handleNextPage={handleNextPage}
                  // isnotbottom={isnotbottom}
                  loglists={loglists} />
              ))
              }
            </TabPane> */}
              <TabPane tab="영업일지" key="2">
                <SalesLogFilter data={data} setData={setData} />
                <div className='mt-3 ml-2'>
                  <Text style={{ fontSize: 12, fontWeight: 500 }} ><span style={{ color: '#000fff' }}>{props.loglistcount ? props.loglistcount : 0}</span> 개의 일지</Text>
                </div>
                <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0 }} />

                {(tabkey === '0010001') && loglists.map((v) => (
                  <LogList key={v.slog_idx}
                    loglist={v}
                    handleNextPage={handleNextPage}
                    // isnotbottom={isnotbottom}
                    loglists={loglists} />
                ))
                }
              </TabPane>
              <TabPane tab="리드일지" key="3">
                <LeadLogFilter data={data} setData={setData} />
                <div className='mt-3 ml-2'>
                  <Text style={{ fontSize: 12, fontWeight: 500 }} ><span style={{ color: '#000fff' }}>{props.loglistcount ? props.loglistcount : 0}</span> 개의 일지</Text>
                </div>
                <Divider />
                {(tabkey === '0010002') && loglists.map((v) => (
                  <LogList key={v.slog_idx}
                    loglist={v}
                    handleNextPage={handleNextPage}
                    // isnotbottom={isnotbottom}
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


