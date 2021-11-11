import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory, useParams } from 'react-router';
import { Divider } from 'antd';
import { getNoticeSysDetail, postNoticeSysDel } from 'redux/etc/actions';
import { base64Dec, errorMessage } from 'constants/commonFunc';
import { useStyles } from '../../../../customer/registerManager'
import { getUserInfo } from 'helpers/authUtils';

const sysNoticeRegi = () => {
  const classes = useStyles()
  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const [noticeData, setNoticeData] = useState([])
  const [noticeId, setNoticeId] = useState(null)

  let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  let regex = new RegExp(expression);

  const navigateTo = () => history.goBack()

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    }
    )
    setNoticeId(base64Dec(params.noticeId))
    dispatch(getNoticeSysDetail.call({ b_idx: base64Dec(params.noticeId) }))

  }, [params.noticeId])

  const onEditClick = () => {
    if (getUserInfo().permission === '-1000') {
      history.push({ pathname: `/main/etc/notice/system/update/${params.noticeId}/` })
    } else {
      errorMessage('권한이 없습니다.')
    }
  }

  useEffect(() => {
    if (state.getNoticeSysDetailRes) {
      setNoticeData(state.getNoticeSysDetailRes[0])
    }
  }, [state.getNoticeSysDetailRes])

  useEffect(() => {
    if (state.sysDeleteRes) {
      history.push({ pathname: `/main/etc/notice/system` })
      state.sysDeleteRes = false;
    }
  }, [state.sysDeleteRes])


  const onDeleteClick = () => {
    if (getUserInfo().permission === '-1000') {
      dispatch(postNoticeSysDel.call({ b_idx: base64Dec(params.noticeId) }))
    } else {
      errorMessage('권한이 없습니다.')
    }
  }
  return (

    (noticeData && noticeData.length > 0) ?
      <div >
        <MyAppBar
          barTitle={'시스템 공지'}
          showBackButton
          navigateTo={navigateTo}
          onWorkGroupEdit={onEditClick}
          onWorkGroupDelete={onDeleteClick}
        />

        <div className='content_body'>
          <div style={{ marginTop: 10 }}>
            <label className={classes.showDetails}>{noticeData[0].title}</label>
            <Divider style={{ margin: 0 }} />
          </div>

          <div style={{ margin: 10, whiteSpace: 'pre-wrap' }}>
            <label className={classes.showDetails}>{noticeData[0].content}</label>
          </div>
          <Divider />
        </div>
      </div> :
      <p className={classes.showDetails}>공지를 가져오는 중입니다.</p>

  );
}

export default sysNoticeRegi;