import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import Input from 'components/styledcomponent/Input'
import { useHistory } from 'react-router';
import { Divider, } from 'antd';
import { postWorkGroupRegi } from 'redux/workgroup/actions';
import { alertMessage } from 'constants/commonFunc';
import cmm from 'constants/common';

const WgroupManagePage = () => {

  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const navigateTo = () => history.goBack()
  const dispatch = useDispatch()
  const regiRes = state.postWorkGroupRegiRes;

  // body
  const [inputs, setInputs] = useState(
    {
      comp_name: '',
      comp_domain: '',
      errResult: '',
    }
  )

  useEffect(() => {
    dispatch({ type: SET_NAVIBAR_SHOW, payload: true })
  }, [])

  const onSaveClick = () => {
    if (!inputs.comp_name || !inputs.comp_domain) {
      return alertMessage('워크그룹 이름,URL 은 필수 항목입니다.')
    }
    if (inputs.comp_name.includes('(주)' || '주식회사')) {
      return alert('주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.')
    }
    dispatch(postWorkGroupRegi.call(inputs))
    return
  }

  useEffect(() => {
    if (!cmm.isEmpty(regiRes)) {
      state.postWorkGroupRegiRes = null;
      if (regiRes.state === false && regiRes.message.message.indexOf('사용중인 업체') > 0) {
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
  }, [regiRes])

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <MyAppBar
        barTitle={'워크그룹 생성'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />
      <div className='content_body'>
        <div style={{ display: 'flex' }}>

          <div style={{
            position: 'relative',
            bottom: 0,
            top: 10,
            width: '100%',
            justifyContent: 'bottom',
            alignItems: 'top'
          }}>
            <label>워크그룹 이름 <span style={{ color: 'red' }}>*</span></label>
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
        <label >워크그룹 URL <span style={{ color: 'red' }}>*</span></label>
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
            fontSize: 14,
            fontWeight: 400,
            color: '#111111'
          }}>&nbsp;.saleslog.com</label>
        </div>
        {
          inputs.errResult.split('\n').map(item => {
            return (<span key={item} style={{ fontSize: 12, color: '#EE1818', marginTop: 5 }}>{item}<br /></span>)
          })
        }
      </div>
    </>
  );
}

export default WgroupManagePage;