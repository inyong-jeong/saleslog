import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory, useParams } from 'react-router';
import { Divider } from 'antd';
import { getNoticeGrpDetail, postNoticeGrpDel } from 'redux/etc/actions';
import { base64Dec } from 'constants/commonFunc';
import { useStyles } from '../../../../customer/registerManager'
import Typography from '@material-ui/core/Typography';

const grpNoticeRegi = () => {

  const classes = useStyles()
  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const [noticeData, setNoticeData] = useState([])
  const [noticeId, setNoticeId] = useState(null)

  const navigateTo = () => history.goBack()

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    }
    )
    setNoticeId(base64Dec(params.noticeId))
    dispatch(getNoticeGrpDetail.call({ b_idx: base64Dec(params.noticeId) }))

  }, [params.noticeId])

  const onEditClick = () => {
    history.push({ pathname: `/main/etc/notice/group/update/${params.noticeId}/` })
    return
  }
  useEffect(() => {
    if (state.getNoticeGrpDetailRes) {
      setNoticeData(state.getNoticeGrpDetailRes[0])
    }
  }, [state.getNoticeGrpDetailRes])

  //워크그룹 삭제 후 
  useEffect(() => {
    if (state.workDeleteRes) {
      history.push({ pathname: `/main/etc/notice/group` })
      state.workDeleteRes = false;
    }
  }, [state.workDeleteRes])

  // 워크그룹 삭제

  const onDeleteClick = () => {
    dispatch(postNoticeGrpDel.call({ b_idx: base64Dec(params.noticeId) }))
  }

  return (
    (noticeData && noticeData.length > 0) ?
      <div >
        <MyAppBar
          barTitle={'워크그룹 공지'}
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
          <div style={{ marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10, whiteSpace: 'pre-wrap' }}>
            <label className={classes.showDetails}>{noticeData[0].content}</label>
          </div>
          <Divider />
        </div>
      </div> :
      <p className={classes.showDetails}>공지를 가져오는 중입니다.</p>
  );
}

export default grpNoticeRegi;