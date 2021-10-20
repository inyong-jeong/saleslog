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
  const [page, setPage] = useState(1)
  const [inputs, setInputs] = useState({
    srch: '',
    pageno: page,
  })


  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
    dispatch(getNoticeGrpList.call(inputs))
  }, [])

  useEffect(() => {
    if (page == 1 && loading == false) {
      dispatch(getNoticeGrpList.call({ srch: inputs.srch, pageno: page }))
    }
  }, [inputs])

  useEffect(() => {
    if (loading == true) return
    dispatch(getNoticeGrpList.call({ srch: inputs.srch, pageno: page }))
  }, [page])


  useEffect(() => {
    if (state.getNoticeGrpListRes && loading == false) {
      if (page == 1) {
        return setNoticeList(state.getNoticeGrpListRes)
      }
      setNoticeList(noticeList.concat(state.getNoticeGrpListRes))
    }
  }, [state.getNoticeGrpListRes])


  const setData = () => {
    dispatch(getNoticeGrpList.call(inputs))
  }

  const onSearch = (keyword) => {
    setInputs({ ...inputs, srch: keyword })
    setPage(1)
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
          page={page}
          setPage={setPage}
          setInputs={setInputs}
          setData={setData}
          data={noticeList}
          loading={loading}
          noticeType={'group'}
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