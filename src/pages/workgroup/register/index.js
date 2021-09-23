import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import AvatarUp from 'components/AvatarUp';
import IconLabel from 'components/IconLabel';
import Input from 'components/styledcomponent/Input'
import { useHistory } from 'react-router';
import { Avatar, Divider, Modal, notification } from 'antd';
import { transform } from 'babel-core';
import { postWorkGroupRegi } from 'redux/workgroup/actions';
import { alertMessage } from 'constants/commonFunc';
import cmm from 'constants/common';


const useStyles = makeStyles({
  bodyContent: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    width: '100%'
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    }
  },
});

const WgroupManagePage = (props) => {
  const classes = useStyles();
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const navigateTo = () => history.push('/main/workgroup')
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

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });


  useEffect(() => {
    // 하단 네비 설정   
    dispatch({ type: SET_NAVIBAR_SHOW, payload: true })
  }, [])

  const onSaveClick = (e) => {
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
        barTitle={'워크그룹 생성'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}

      />
      <div >
        <div style={{ height: 40 }}></div>
        <div style={{ display: 'flex' }}>

          <div style={{
            position: 'relative',
            bottom: 0,
            top: 10,
            width: '100%',
            justifyContent: 'bottom',
            alignItems: 'top'
          }}>
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
        <label className={classes.laebelStyle}>워크그룹 URL *</label>
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
      </div>
    </>
  );
}

export default WgroupManagePage;