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
import { postNoticeGrpRegi } from 'redux/etc/actions';
import cmm from 'constants/common';

const grpNoticeRegi = (props) => {

  const titleStyle = {
    fontSize: 12,
    color: '#666666',
    marginLeft: 5,
  }
  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const [myData, setMyData] = useState(null)
  const [inputs, setInputs] = useState(
    {
      title: '',
      content: '',
      prevImg: null,
      fileup: null,
    }
  )

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  //이전페이지
  const navigateTo = () => history.push('/main/etc/notice/group')


  useEffect(() => {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    }
    )
    console.log('state::::::::::::::::::::', state)
    //setInputs({...inputs, login_idx:base64Dec(params.memberId)})

  }, [])

  const onSaveClick = (e) => {
    if (cmm.isEmpty(inputs.title)) {
      return alert('제목을 입력하세요.')
    }
    if (cmm.isEmpty(inputs.content)) {
      return alert('내용을 입력하세요.')
    }
    //공지사항 등록
    dispatch(postNoticeGrpRegi.call(inputs))
    return
  }

  //공지사항등록 fetch 후
  useEffect(() => {
    if (state.postNoticeGrpRegiRes) {
      state.postNoticeGrpRegiRes = false;
      history.push('/main/etc/notice/group')
    }
  }, [state.postNoticeGrpRegiRes])

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  return (

    <div >
      <MyAppBar
        barTitle={'워크그룹 공지 등록'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />
    <div className='content_body'>
      <div style={{ marginTop: 10 }}>
        <label style={titleStyle}>제목 </label><br />
        <Input
          name='title'
          onChange={handleChange}
          value={inputs.title}
          required
          placeholder="제목을 입력해주세요."
          margin="normal"
        />
      </div>
      <Divider />
      <div>
        <label style={titleStyle}>공지 내용 </label><br />
        <TextArea
          rows={10}
          name='content'
          placeholder="내용을 입력해주세요."
          onChange={handleChange}
          value={inputs.content}
        />
      </div>
    </div>
    </div>
  );
}

export default grpNoticeRegi;