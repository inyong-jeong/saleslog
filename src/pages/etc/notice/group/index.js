import React, { useState, useEffect } from "react";
import CustomFab from "components/styledcomponent/CustomFab";
import styles from 'components/customer/styles/Customer.module.css'
import MyAppBar from "components/styledcomponent/MyAppBar";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
import NoticeItems from "components/etc/notice/NoticeItems";
import { getNoticeGrpList } from "redux/etc/actions";
import { useSelector, useDispatch } from "react-redux";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { getUserInfo } from 'helpers/authUtils';

const { Search } = Input;
const GroupNoticePage = () => {

  const myInfo = getUserInfo();
  const history = useHistory()
  const navigateTo = () => history.push({ pathname: '/main/etc/notice/group/register' })
  const dispatch = useDispatch()
  const state = useSelector(state => state.Etc)
  const loading = state.loading
  const [noticeList, setNoticeList] = useState([])
  //const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState({
    srch: '',
    pageno: 1,
  })
  const [totcnt, setTotcnt] = useState(0)


  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
    setPage(1)
    //dispatch(getNoticeGrpList.call(inputs))
  }, [])

  // useEffect(() => {
  //   // if (loading == false) {
  //   //   dispatch(getNoticeGrpList.call({ srch: inputs.srch, pageno: page }))
  //   // }

  //   if (loading == true) return
  //   //if (page == 1) {
  //     console.log('dispatch inpusts:::1111111111')
  //     dispatch(getNoticeGrpList.call({ srch: inputs.srch, pageno: inputs.pageno }))
  //   //}
  // }, [inputs])

  // useEffect(() => {
  //   if (loading == true) return
  //   console.log('dispatch page:::222222')
  //   dispatch(getNoticeGrpList.call({ srch: inputs.srch, pageno: page }))
  // }, [page])


  useEffect(() => {
    
    if (state.getNoticeGrpListRes && loading == false ) {
      if (state.getNoticeGrpListRes.length <= 0 ) return      
      if (state.getNoticeGrpListRes[0].length <= 0) return

      setTotcnt(state.getNoticeGrpListRes[1][0].totcnt)
      console.log('0000000',state.getNoticeGrpListRes, state.getNoticeGrpListRes[1][0].totcnt);
      if (state.getNoticeGrpListRes[0][0].pageno === '1') {
      ///if (inputs.pageno == 1) {
        //console.log('page::::::::::1111111111',state.getNoticeGrpListRes[0].pageno)
        setNoticeList(state.getNoticeGrpListRes[0])
        return
      }
      //console.log('page::::::::::',inputs.pageno, state.getNoticeGrpListRes.length)
      setNoticeList(noticeList.concat(state.getNoticeGrpListRes[0]))
    }
    state.getNoticeGrpListRes = null;

  }, [state.getNoticeGrpListRes])
  
  
  const setPage = (page) => {
    //console.log(page, inputs.pageno)
    if (page!=1 && page <= inputs.pageno ) return;
    dispatch(getNoticeGrpList.call({ srch: inputs.srch, pageno: page }))
    setInputs({ ...inputs, pageno:page })
  }

  const setData = () => {
    //dispatch(getNoticeGrpList.call(inputs))
  }

  const onSearch = (keyword) => {
    setInputs({ ...inputs, srch: keyword, pageno:1 })
    //setPage(1)
  }

  return (
    <div>
      <MyAppBar barTitle={'워크그룹 공지'} />
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
          page={inputs.pageno}
          setPage={setPage}
          setInputs={setInputs}
          setData={setData}
          data={noticeList}
          loading={loading}
          noticeType={'group'}
          totcnt={totcnt}
        />

        {myInfo.permission != 9 ?
          <div className={styles.Wrapper}>
            <CustomFab navigateTo={navigateTo} />
          </div>
          : null}

      </div>
    </div>
  );
}

export default GroupNoticePage;