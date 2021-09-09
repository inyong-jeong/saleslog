
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import React, { useEffect } from 'react';
import { getRefreshOauthToken } from '../../redux/actions';

import { testval } from '../../redux/store.js'



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

  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true}
    )
  },[])

  return (
    <ThemeProvider theme={theme}>
      <li>정보 수정</li>
      <li>맴버 관리</li>
      <li>조직도 설정</li>
      { props.MyNavigation}
      {/* {isMobile && <MyNavigation />} */}
    </ThemeProvider>
  );
}

export default WgroupManagePage;