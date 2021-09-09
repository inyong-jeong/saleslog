import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { Divider } from 'antd';
import  IconLabel from 'components/IconLabel';


const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    }
  },
});

const WgroupManagePage = (props) => {
  const state = useSelector(state => state.Auth)
  console.log('auth state',state)

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
    </ThemeProvider>
  );
}

export default WgroupManagePage;