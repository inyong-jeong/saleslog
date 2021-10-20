import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory } from 'react-router';
import { Divider } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import Input from 'components/styledcomponent/Input';
import { postNoticeGrpRegi } from 'redux/etc/actions';
import cmm from 'constants/common';
import { errorMessage } from 'constants/commonFunc';
const grpNoticeRegi = () => {

  const titleStyle = {
    fontSize: 12,
    color: '#666666',
    marginLeft: 5,
  }
  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState(
    {
      title: '',
      content: '',
      prevImg: null,
      fileup: null,
    }
  )

  const navigateTo = () => history.goBack()
  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
  }, [])

  const onSaveClick = () => {

    if (cmm.isEmpty(inputs.title)) {
      return alert('제목을 입력하세요.')
    }
    if (cmm.isEmpty(inputs.content)) {
      return alert('내용을 입력하세요.')
    }
    dispatch(postNoticeGrpRegi.call(inputs))
    return
  }

  useEffect(() => {
    if (state.postNoticeGrpRegiRes) {
      state.postNoticeGrpRegiRes = false
      history.push('/main/etc/notice/group')
    }
  }, [state.postNoticeGrpRegiRes])

  const handleChange = (e) => {

    if (e.target.name == 'title' && e.target.value.length > 50) {
      return errorMessage('제목은 50자를 넘을 수 없습니다.')
    }
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