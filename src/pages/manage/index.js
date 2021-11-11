import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Tabs, Row, Col, Divider, message } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useDispatch, useSelector } from 'react-redux'
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
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
import { useHistory } from 'react-router-dom';
import { InvertColorsOff } from '@material-ui/icons';

const { TabPane } = Tabs;
function SalesLogList(props) {
  const state = useSelector(state => state.SalesLog)
  const history = useHistory();

  const navigateTo = () => history.push({
    pathname: '/main/upload'
  })
  const listref = useRef();
  // console.log(listref);
  const [loglists, setLogLists] = useState([]);
  const [tabkey, setTabKey] = useState('0010001');
  const [firsttime, setFirsttime] = useState(true);
  const [hasMore, setHasMore] = useState(true)

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
    dept_idx: ''
  }
  )



  useEffect(() => {
    data.pageno = 1;
  }, [])


  useEffect(() => {
    if (state.StoredData) {
      setTabKey(state.StoredData.data.log_gb);
    }
  }, [state.StoredData])

  // 권한에 따른 dispatch call

  // useEffect(() => {
  //   if (!firsttime) {
  //     props.getLogLists(data)
  //   }
  // }, [data])

  useEffect(() => {
    props.getLogLists(data)
    // setFirsttime(false);
  }, [data])

  // 데이터 받아 온 것 set
  useEffect(() => {
    if (props.loglist && !props.loadLogsLoading) {
      if (data.pageno === 1) {
        setHasMore(true)
        return setLogLists(props.loglist)
      }
      if (loglists.length >= props.loglistcount) {
        setHasMore(false);
      } else {
        setLogLists(loglists.concat(props.loglist))
      }
      
    }
  }, [props.loadLogsLoading])



  // const handleNextPage = () => {
  //   if (props.loglistcount >= loglists.length) {
  //     if (props.loadLogsLoading === true) return
  //     data.pageno = data.pageno + 1
  //     setData({ ...data, 'pageno': data.pageno })
  //   }


  // }

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
      text: text.toLowerCase(),
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
    setSearchStr('')
  }

  const setKeyword = (v) => {
    setSearchStr(v)
  }

  const observerRef = useRef();

  const observer = useCallback((node) => {
    console.log(node)
    if (state.loadLogsLoading) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver((entries, options) => {
      console.log(entries);
      if (entries[0].isIntersecting && hasMore) {
        console.log(entries);
        data.pageno = data.pageno + 1
        setData({ ...data, 'pageno': data.pageno })
      }
    })
    node && observerRef.current.observe(node)
  }, [state.loadLogsLoading, hasMore])

  return (
    <>
      <MyAppBar barTitle={'일지'} />

      <div className='content_body'
      >
        {/* <Row>
        <Col md={24} lg={24} xs={24}> */}
        <Row >
          <Col sm={24} xs={24} md={24} lg={24}>
            <SearchBar searchStr={searchStr}
              word={state.StoredData && state.StoredData.data.srch}
              onAddKeyword={handleAddKeyword}
              SearchChange={onSearch}
              SearchEnter={onEnter}
              BlankEnter={onBlankEnter}
              clearKeyword={clearKeyword}
              Focus={setFocus}
              focused={focus}
            />
            {focus && <History
              changefunction={onSearch}
              keyword={word}
              historyKeyword={setKeyword}
              keywords={keywords}
              onClearKeywords={handleClearKeywords}
              onRemoveKeyword={handleRemoveKeyword}
            />}
          </Col>
        </Row>
        <Row>
          <Col sm={24} xs={24} md={24} lg={24} >
            <FullTabs type='line' defaultActiveKey="0010001" onChange={onTabChange} activeKey={tabkey}>

              <TabPane tab="영업일지" key="0010001">
                <SalesLogFilter data={data} setData={setData} firsttime={firsttime} />
                <div className='mt-3 ml-2'>
                  <Text style={{ fontSize: 12, fontWeight: 500 }} ><span style={{ color: '#398fff' }}>{props.loglistcount ? props.loglistcount : 0}</span> 개의 일지</Text>
                </div>
                <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0, borderWidth: '5px' }} />

                {loglists.length > 0 ? loglists.map((v) => (
                  <LogList
                    key={v.slog_idx}
                    data={data}
                    setData={setData}
                    loglist={v}
                    tabkey={tabkey}
                    // handleNextPage={handleNextPage}
                    loglists={loglists} />
                ))
                  :
                  <>
                    <p>작성된 일지가 없습니다. </p>
                  </>
                }


              </TabPane>
              <TabPane tab="리드일지" key="0010002">
                <LeadLogFilter key={'leadlog'} id={'leadlog'} data={data} setData={setData} />
                <div className='mt-3 ml-2'>
                  <Text style={{ fontSize: 12, fontWeight: 500 }} ><span style={{ color: '#000fff' }}>{props.loglistcount ? props.loglistcount : 0}</span> 개의 일지</Text>
                </div>
                <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0, borderWidth: '5px' }} />
                {loglists.length > 0 ? loglists.map((v) => (
                  <LogList key={v.slog_idx}
                    setData={setData}
                    data={data}
                    loglist={v}
                    tabkey={tabkey}
                    // handleNextPage={handleNextPage}
                    loglists={loglists} />
                ))
                  :
                  <>
                    <p>작성된 일지가 없습니다. </p>
                  </>

                }


              </TabPane>
            </FullTabs>

          </Col>
        </Row>
        <div ref={observer} />
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


