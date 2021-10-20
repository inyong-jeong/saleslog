import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory, useParams } from 'react-router';
import { Divider } from 'antd';
import { getNoticeSysDetail } from 'redux/etc/actions';
import { base64Dec } from 'constants/commonFunc';
import { useStyles } from '../../../../customer/registerManager'
import Typography from '@material-ui/core/Typography';

const sysNoticeRegi = () => {
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
    dispatch(getNoticeSysDetail.call({ b_idx: base64Dec(params.noticeId) }))

  }, [params.noticeId])

  const onEditClick = () => {
    history.push({ pathname: `/main/etc/notice/system/update/${params.noticeId}/` })
    return
  }

  useEffect(() => {
    if (state.getNoticeSysDetailRes) {
      setNoticeData(state.getNoticeSysDetailRes[0])
    }
  }, [state.getNoticeSysDetailRes])

  return (
    (noticeData && noticeData.length > 0) ?
      <div >
        <MyAppBar
          barTitle={'시스템 공지'}
          showBackButton
          navigateTo={navigateTo}
          onEditClick={onEditClick}
        />

        <div className='content_body'>
          <div style={{ marginTop: 10 }}>
            <Typography variant='h6' align='left' className={classes.title}>공지 제목</Typography>
            <div style={{ marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10 }}>
              <label className={classes.showDetails}>{noticeData[0].title}</label>
            </div>
            <Divider />
          </div>

          <Typography variant='h6' align='left' className={classes.title}>공지 내용</Typography>
          <div style={{ marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10 }}>
            <label className={classes.showDetails}>{noticeData[0].content}</label>
          </div>
          <Divider />
        </div>
      </div> :
      <p className={classes.showDetails}>공지 내역이 존재하지 않습니다.</p>
  );
}

export default sysNoticeRegi;