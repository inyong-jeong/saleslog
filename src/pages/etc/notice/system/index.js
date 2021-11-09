import React, { useState, useEffect } from "react";
import CustomFab from "components/styledcomponent/CustomFab";
import styles from 'components/customer/styles/Customer.module.css'
import MyAppBar from "components/styledcomponent/MyAppBar";
import { Input } from "antd";
import FullTabs from "components/styledcomponent/FullTabs";
import { useHistory } from "react-router-dom";
import NoticeItems from "components/etc/notice/NoticeItems";
import { getNoticeSysList } from "redux/etc/actions";
import { useSelector, useDispatch } from "react-redux";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useLocation } from "react-router";
import { getUserInfo } from 'helpers/authUtils';

const { TabPane } = FullTabs;
const { Search } = Input;

const SystemNoticePage = () => {
  const history = useHistory()
  const location = useLocation()
  const navigateTo = () => history.push({ pathname: '/main/etc/notice/system/register' })
  const dispatch = useDispatch()
  const state = useSelector(state => state.Etc)
  //const listCounts = state.listCounts
  const loading = state.loading
  //let responseLists = state.list
  const [noticeList, setNoticeList] = useState([])
  //const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState({
    srch: '',
    pageno: 1,
  })
  const [totcnt, setTotcnt] = useState(0)
  const myInfo = getUserInfo();


  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
    setPage(1)
  }, [])

  // useEffect(() => {
  //   if (page == 1 && loading == false) {
  //     dispatch(getNoticeSysList.call({ srch: inputs.srch, pageno: page }))
  //   }
  // }, [inputs])

  // useEffect(() => {
  //   if (loading == true) return
  //   dispatch(getNoticeSysList.call({ srch: inputs.srch, pageno: page }))
  // }, [page])

  // //paging 
  // useEffect(() => {
  //   console.log('state.getNotice:::::::::::::::::::::::', state.getNoticeSysListRes)
  //   if (state.getNoticeSysListRes && loading == false) {
  //     if (page == 1) {
  //       return setNoticeList(state.getNoticeSysListRes)
  //     }
  //     setNoticeList(noticeList.concat(state.getNoticeSysListRes))
  //   }
  // }, [state.getNoticeSysListRes])

  useEffect(() => {
    if (state.getNoticeSysListRes && loading == false) {
      if (state.getNoticeSysListRes.length <= 0 ) return
      if (state.getNoticeSysListRes[0].length <= 0 ) return
      //console.log('state.getNoticeSysListRes[0]',state.getNoticeSysListRes[0].length)
      setTotcnt(state.getNoticeSysListRes[1][0].totcnt)
      //console.log('0000000',state.getNoticeSysListRes, state.getNoticeSysListRes[1][0].totcnt);
      if (state.getNoticeSysListRes[0][0].pageno === '1') {
      ///if (inputs.pageno == 1) {
        //console.log('page::::::::::1111111111',state.getNoticeSysListRes[0].pageno)
        setNoticeList(state.getNoticeSysListRes[0])
        return
      }
      //console.log('page::::::::::',inputs.pageno, state.getNoticeSysListRes.length)
      setNoticeList(noticeList.concat(state.getNoticeSysListRes[0]))
    }
    state.getNoticeSysListRes = null;

  }, [state.getNoticeSysListRes])
  

  const setPage = (page) => {
    //console.log(page, inputs.pageno)
    if (page!=1 && page <= inputs.pageno ) return;
    dispatch(getNoticeSysList.call({ srch: inputs.srch, pageno: page }))
    setInputs({ ...inputs, pageno:page })
  }

  const setData = () => {
    //공지리스트 
    //dispatch(getNoticeSysList.call(inputs))
  }

  const onSearch = (keyword) => {
    setInputs({ ...inputs, srch: keyword, pageno:1 })
    //setPage(1)
  }

  return (
    <div>
      <MyAppBar barTitle={'시스템 공지'} />
      <div className='content_body'>
        <Search
          placeholder="검색"
          allowClear
          onSearch={onSearch}
          style={{
            width: '100%',
            marginBottom: 10,
            marginTop: 10,
          }} />
        <NoticeItems
          page={inputs.page}
          setPage={setPage}
          setInputs={setInputs}
          setData={setData}
          data={noticeList}
          loading={loading}
          noticeType={'system'}
          totcnt={totcnt}
        />
        {/* 우리가 등록하는 공지 */}
        {/* <div className={styles.Wrapper}>
        <CustomFab navigateTo={navigateTo} />
      </div>  */}
        {myInfo.permission === -1000 ?
          <div className={styles.Wrapper}>
            <CustomFab navigateTo={navigateTo} />
          </div>
          : null}
      </div>
    </div>
  );
}

export default SystemNoticePage;