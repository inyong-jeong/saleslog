import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory } from 'react-router';
import { Divider } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import Input from 'components/styledcomponent/Input';
import { postNoticeSysRegi } from 'redux/etc/actions';
import cmm from 'constants/common';

const sysNoticeRegi = () => {

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
    dispatch(postNoticeSysRegi.call(inputs))
    return
  }

  useEffect(() => {
    if (state.postNoticeSysRegiRes) {
      state.postNoticeSysRegiRes = false;
      history.push('/main/etc/notice/system')
    }
  }, [state.postNoticeSysRegiRes])

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  return (

    <div >
      <MyAppBar
        barTitle={'시스템 공지 등록'}
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
        <div style={{ marginTop: 10 }}>
          <label style={titleStyle}>공지 내용 </label><br />
          <TextArea
            rows={10}
            name='content'
            placeholder="내용을 입력해주세요."
            onChange={handleChange}
            value={inputs.content}
          />
          <Divider style={{ width: '100%', margin: 5 }} />
        </div>
      </div>
    </div>
  );
}

export default sysNoticeRegi;