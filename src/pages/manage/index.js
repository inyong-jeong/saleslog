import React, { useEffect, useState } from 'react';
import { Input, Tabs, Row, Col } from 'antd';
import LogList from 'components/LogList'
import SalesLogFilter from 'components/SalesLogFilter';
import LeadLogFilter from 'components/LeadLogFilter';
import { connect } from 'react-redux';
import {
  getLogLists, getLogList, searchLogList,
  putSalesLog, putFile, deleteFile
} from 'redux/actions';
const { TabPane } = Tabs;

function SalesLogList(props) {


  const [key, setKey] = useState(1);
  const [loggb, setLogGb] = useState('0010001');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    log_gb: loggb,
    sales_man: '',
    sales_lead_gb: '',
    sales_goal: '',
    sales_activity: '',
    accts: '',
    accts_man: '',
    pageno: page
  })
  const [isBottom, setIsBottom] = useState(false)

  const [salesloglist, setSalesLogList] = useState([]);
  const [leadloglist, setLeadLogList] = useState([]);

  let Lists = props.loglist;

  console.log(salesloglist);
  // tab 바뀔때 data 변화

  useEffect(() => {
    if (key === 1) {

      setLogGb('0010001')
      setData({ ...data, 'log_gb': loggb })
      // props.getLogLists(data)

    } else if (key === 2) {

      setLogGb('0010002')
      setData({ ...data, 'log_gb': loggb })
      // props.getLogLists(data)

    } else return;
  }, [key])

  //data 바뀔때 call
  useEffect(() => {
    props.getLogLists(data)
  }, [data])

  // page 바뀔 때 call
  useEffect(() => {
    if (Lists && !props.loadLogsLoading) {
      if (page === 1) {
        setSalesLogList(Lists)
      } else {
        setSalesLogList(salesloglist.concat(Lists))
      }
    }
  }, [props.loadLogsLoading])

  // useEffect(() => {
  //   props.getLogLists(data)
  // }, [isBottom])


  const handleNextPage = () => {
    setPage(page + 1)
    // setIsBottom(isBottom => !isBottom)
  }
  // console.log('dddd', salesloglist)

  // useEffect(() => {
  //   if (key === 1 && props.loglist) {
  //     setSalesLogList([...salesloglist, salesloglist.concat(props.loglist)])

  //   } else if (key === 2 && props.loglist) {
  //     setLeadLogList([...leadloglist, leadloglist.concat(props.loglist)])

  //   }
  // }, [pagenumber])


  const selectTab = (key) => {
    setKey(key)
  }

  //영업일지 리스트
  // 영업일지 검색

  const test1 = () => {
    const data = {
      srch: '삼성전자',
      lageno: 1
    }
    props.searchLogList(data)
  }
  const test2 = () => {

  }
  const test3 = () => {

  }
  const test4 = () => {

  }
  const test5 = () => {

  }


  // useEffect(() => {
  //   function onScroll() {
  //     if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
  //       if (!props.loadLogsLoading && props.loglist.length > 0) {
  //         const count = pagenumber + 1;
  //         setPageNumber(count)
  //         setData({ ...data, 'pageno': pagenumber })
  //         props.getLogLists(data)

  //       }
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, [props.loglist, props.loadLogsLoading])
  return (
    <><div style={{ display: 'block' }}>
      <button onClick={test1}>test2</button>
      <button onClick={test2}>test3</button>
      <button onClick={test3}>4</button>
      <button onClick={test4}>5</button>
      <button onClick={test5}>6</button>
    </div>
      <Row>
        <Col md={24} lg={24} xs={24}>
          <Input.Search placeholder='검색어를 입력해주세요'></Input.Search>
        </Col>
      </Row>
      <Row>
        <Col sm={24} xs={24} md={24} lg={24} >
          <Tabs style={{ width: '100%' }} size='large' type='line' defaultActiveKey="1" onChange={selectTab}>
            <TabPane tab={<div style={{ width: '100%', textAlign: 'center' }}>영업일지</div>} key="1">
              <SalesLogFilter />
              {salesloglist.map((v) => (
                <LogList key={v.slog_idx} loglist={v} handleNextPage={handleNextPage} />
              ))
              }
            </TabPane>
            <TabPane tab={<div style={{ width: '200px', textAlign: 'center' }}>리드일지</div>} key="2">
              <LeadLogFilter />
              {salesloglist.map((v) => (
                <LogList key={v.slog_idx} loglist={v} handleNextPage={handleNextPage} />
              ))
              }
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Row>
      </Row>
    </>
  )
}

const mapStateToProps = (state) => {
  const { loglist, loadLogsLoading } = state.SalesLog;
  return { loglist, loadLogsLoading };
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
