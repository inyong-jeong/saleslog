import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import AvatarUp from 'components/AvatarUp';
import IconLabel from 'components/IconLabel';
import Input from 'components/styledcomponent/Input'
import { useHistory } from 'react-router';
import { Avatar, Divider, notification } from 'antd';
import { transform } from 'babel-core';
import { getWorkGroupInfo, postWorkGroupLogo, postWorkGroupUpd } from 'redux/workgroup/actions';
import cmm from 'constants/common';

const WgroupManagePage = (props) => {

  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const navigateTo = () => history.push('/main/workgroup')
  const dispatch = useDispatch()
  const data = state.data;
  const updRes = state.postWorkGroupUpdRes;

  // body
  const [inputs, setInputs] = useState(
    {
      comp_name: '',
      comp_domain: '',
      prevImg: null,
      fileup: null,
      errResult: '',

    }
  )


  useEffect(() => {
    // 하단 네비 설정   
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    }
    )

    //워크그룹 정보 가져오기
    dispatch(getWorkGroupInfo.call())
  }, [])


  useEffect(() => {
    if (inputs.fileup !== null) {
      dispatch(postWorkGroupLogo.call({ fileup: inputs.fileup }))
    }
  }, [inputs.fileup])


  useEffect(() => {
    if (!cmm.isEmpty(data)) {
      setInputs({
        ...inputs,
        comp_name: data[0].organization,
        comp_domain: data[0].org_domain,
        prevImg: (cmm.isEmpty(data[0].logo_url) ? '' : cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + data[0].logo_url)
      })
      console.log(cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + data[0].logo_url);
    }

  }, [data])

  const onSaveClick = (e) => {
    if (!inputs.comp_name || !inputs.comp_domain) {
      return alert('워크그룹 이름,URL 은 필수 항목입니다.')
    }
    if (inputs.comp_name.includes('(주)' || '주식회사')) {
      return alert('주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.')
    }
    dispatch(postWorkGroupUpd.call(inputs))
    return
  }

  useEffect(() => {
    if (!cmm.isEmpty(updRes)) {
      state.postWorkGroupUpdRes = null;
      if (updRes.state === false && updRes.message.message.indexOf('사용중인 업체') > 0) {
        setInputs({
          ...inputs,
          errResult: '이미 사용중인 URL 입니다.\n다른 URL을 입력하거나 숫자를 조합해 보세요.'
        })
      } else {
        const interval = setInterval(() => {
          history.push({
            pathname: '/main/workgroup',
            state: {
              needRefresh: true,
            }
          })
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [updRes])


  const handleChangeFile = e => {
    const fileUploaded = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setInputs({
        ...inputs,
        fileup: fileUploaded,
        prevImg: reader.result
      })
    }
    if (!cmm.isEmpty(e.target.files)) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  return (
    <>
      <MyAppBar
        barTitle={(cmm.isEmpty(inputs.comp_name)) ? '워크그룹' : inputs.comp_name}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />
      <div style={{ display: 'flex' }}>
        <AvatarUp imgsrc={cmm.isEmpty(inputs.prevImg) ? '' : inputs.prevImg}
          iconShape='square'
          height={90}
          style={{
            padding: 0,
            marginLeft: 10,
            width: 90,
            height: 90
          }}
          handleChange={handleChangeFile} />
        <div style={{ flexGrow: 2 }}>
          <label >워크그룹 이름 *</label><br />
          <Input
            name='comp_name'
            onChange={handleChange}
            value={inputs.comp_name}
            required
            placeholder="워크그룹 이름을 입력해주세요."
            margin="normal"
          />
        </div>
      </div>
      <Divider style={{ margin: '30,10' }} />
      <label>워크그룹 URL *</label>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Input
          name='comp_domain'
          onChange={handleChange}
          value={inputs.comp_domain}
          required
          placeholder="URL 입력해주세요."
          margin="normal"
        />
        <label style={{
          fontSize: 18,
          width: 200
        }}>&nbsp;.saleslog.com</label>
      </div>
      {
        inputs.errResult.split('\n').map(item => {
          return (<span key={item} style={{ fontSize: 11, color: '#EE1818' }}>{item}<br /></span>)
        })
      }

    </>
  );
}

export default WgroupManagePage;