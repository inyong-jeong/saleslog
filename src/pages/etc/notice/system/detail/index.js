import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory, useParams } from 'react-router';
import { Divider, Button, Select } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import Input from 'components/styledcomponent/Input';
import { RightOutlined } from "@ant-design/icons";
import { getNoticeSysDetail, postNoticeSysDel } from 'redux/etc/actions';
import { base64Dec } from 'constants/commonFunc';
import cmm from 'constants/common';

const sysNoticeRegi = (props) => {
  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const [noticeData, setNoticeData] = useState([])
  const [noticeId, setNoticeId] = useState(null)

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  //이전페이지
  const navigateTo = () => history.push('/main/etc/notice/system')


  useEffect(() => {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    }
    )
    setNoticeId(base64Dec(params.noticeId))
    dispatch(getNoticeSysDetail.call({ b_idx: base64Dec(params.noticeId) }))

  }, [])

  const onEditClick = (e) => {
    //공지사항 수정
    history.push({ pathname: `/main/etc/notice/system/update/${params.noticeId}/` })
    return
  }

  //공지사항등록 fetch 후
  useEffect(() => {
    if (state.getNoticeSysDetailRes) {
      setNoticeData(state.getNoticeSysDetailRes[0])
      console.log(state.getNoticeSysDetailRes[0])
    }
  }, [state.getNoticeSysDetailRes])

  return (
    (noticeData && noticeData.length > 0) &&
    <div >
      <MyAppBar
        barTitle={'시스템 공지'}
        showBackButton
        navigateTo={navigateTo}
        onEditClick={onEditClick}
      />

    <div className='content_body'>
      <div style={{ marginTop: 10 }}>
        <label style={{ padding: 5, color: '#aaa' }}>제목 </label><br />
        <label style={{ padding: 5, margin: 0 }}>{noticeData[0].title}</label>
        <Divider style={{ width: '100%', margin: 5 }} />
      </div>
      <div style={{ marginTop: 10 }}>
        <label style={{ padding: 5, color: '#aaa' }}>공지내용 </label><br />
        <label style={{ padding: 5, margin: 0, whiteSpace: "pre-wrap" }}>{noticeData[0].content}</label>
        <Divider style={{ width: '100%', margin: 5 }} />
      </div>
    </div>
    </div>
  );
}

export default sysNoticeRegi;