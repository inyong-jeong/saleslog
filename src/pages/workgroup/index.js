import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, {useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import  IconLabel from 'components/IconLabel';
import { useHistory } from 'react-router';
import { Divider } from 'antd';
import { getWorkGroupInfo } from 'redux/workgroup/actions';
import cmm from 'constants/common';


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
  const navigateTo = () => history.push('/main/customer')
  const dispatch = useDispatch()
  const data = state.data;

  // body
  const [inputs, setInputs] = useState(
    {
      data: null,
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
    if (!cmm.isEmpty(data)) {
      console.log('workgroup data:::::::',data)
      setInputs({ ...inputs, data:data[0], prevImg: (cmm.isEmpty(data[0].logo_url)?'':cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + data[0].logo_url) })      
    }
      
  },[data])

  return (
    <ThemeProvider theme={theme}>
      {isMobile && <MyAppBar barTitle={(cmm.isEmpty(inputs.data))?'워크그룹':inputs.data.organization} navigateTo={navigateTo} />}     
      <div style={{height:20}}></div>
      <IconLabel title="정보 수정" pathUri="main/workgroup/register"></IconLabel>
      <Divider style={{margin:10}}/>
      <IconLabel title="맴버 관리" pathUri="main/customer"></IconLabel>
      <Divider style={{margin:10}}/>
      <IconLabel title="조직도 설정" pathUri="main/customer"></IconLabel>
      <Divider style={{margin:10}}/>
      <div className={classes.bottomBar} >
        <IconLabel title="워크그룹 나가기" pathUri="main/customer" isIcon={false}></IconLabel>
        <div>&nbsp; |&nbsp; </div>
        <IconLabel title="워크그룹 삭제" pathUri="main/customer" isIcon={false}></IconLabel>
      </div>
    </ThemeProvider>
  );
}

export default WgroupManagePage;