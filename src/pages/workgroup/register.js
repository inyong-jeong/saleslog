import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { Divider } from 'antd';
import  IconLabel from 'components/IconLabel';


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
  const state = useSelector(state => state.Auth)
  
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  // 하단 네비 설정 
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true}
    )
  },[])

  return (
    <ThemeProvider theme={theme}>
      <IconLabel title="정보 수정" pathUri="main/customer"></IconLabel>
      <IconLabel title="맴버 관리" pathUri="main/customer"></IconLabel>
      <IconLabel title="조직도 설정" pathUri="main/customer"></IconLabel>
      <div className={classes.bottomBar} >
        <IconLabel title="워크그룹 나가기" pathUri="main/customer" isIcon={false}></IconLabel>
        <div >|</div>
        <IconLabel title="워크그룹 삭제" pathUri="main/customer" isIcon={false}></IconLabel>
      </div>
    </ThemeProvider>
  );
}

export default WgroupManagePage;