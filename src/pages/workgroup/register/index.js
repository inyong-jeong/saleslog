import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import  AvatarUp from 'components/AvatarUp';
import  IconLabel from 'components/IconLabel';
import Input from 'components/styledcomponent/Input'
import { useHistory } from 'react-router';
import { Avatar, Divider } from 'antd';
import { transform } from 'babel-core';
import { getWorkGroupInfo, postWorkGroupLogo, postWorkGroupUpd } from 'redux/workgroup/actions';
import  cmm  from 'constants/common';


const useStyles = makeStyles({
  bottomBar: {
    width: '100%',
    position: 'fixed',
    bottom: 60,
    left:0,
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent:'center'
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
  const data = state.data;
  const updRes = state.postWorkGroupUpdRes;

  // body
  const [inputs, setInputs] = useState(
    {
      comp_name: '',
      comp_domain: '',
      prevImg: null,
      fileup: null,

    }
  )
  
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });


  useEffect(()=> {
    // 하단 네비 설정   
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true}
    )

    //워크그룹 정보 가져오기
    dispatch(getWorkGroupInfo.call())
  },[])


  useEffect(()=> {
    if (inputs.fileup !== null) {
      dispatch(postWorkGroupLogo.call({fileup: inputs.fileup}))
    }
  },[inputs.fileup])

  
  useEffect(()=> {
    if (!cmm.isEmpty(data)) {
      setInputs({ 
        ...inputs, 
        comp_name:data[0].organization, 
        comp_domain:data[0].org_domain, 
        prevImg: (cmm.isEmpty(data[0].logo_url)?'':cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + data[0].logo_url) 
      })      
    }
      
  },[data])

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

  useEffect(()=> {
    if (!cmm.isEmpty(updRes)) {  
      state.postWorkGroupUpdRes = null;    
      history.push({
        pathname: '/main/workgroup',
        state: {
          needRefresh: true,
        }
      })
    }      
  },[updRes])


  const handleChangeFile = e => {    
    const fileUploaded = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setInputs({ 
        ...inputs, 
        fileup: fileUploaded, 
        prevImg: reader.result })      
    }
    reader.readAsDataURL(e.target.files[0]);
    
  }

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  return (
    <ThemeProvider theme={theme}>
      {isMobile && <MyAppBar 
        barTitle={(cmm.isEmpty(inputs.comp_name))?'워크그룹':inputs.comp_name}         
        showBackButton
        navigateTo={navigateTo} 
        onSaveClick={onSaveClick}
        
        />}     
      <div style={{height:40}}></div>
      <div style={{ display: 'flex' }}>
        <AvatarUp imgsrc={cmm.isEmpty(inputs.prevImg)?'':inputs.prevImg} 
                  iconShape='square' 
                  style={{ 
                    padding:0,
                    margin:0,
                    width:90,
                    height:90,
                  }} 
                  handleChange={handleChangeFile} /> 
        <div style={{
                position:'relative',
                bottom: 0,
                left:-20,
                top:10,
                width:'100%',
                justifyContent:'bottom',
                alignItems:'top'
              }}>
          <label >워크그룹 이름 *</label><br/>
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
      <Divider style={{margin:'30,10'}}/>            
      <label className={classes.laebelStyle}>워크그룹 URL *</label>
      <div style={{
              display: 'flex', 
              justifyContent:'center',
              alignItems:'center'
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
                  fontSize:18,
                  width:200
                }}>&nbsp;.saleslog.com</label>
      </div>

    </ThemeProvider>
  );
}

export default WgroupManagePage;