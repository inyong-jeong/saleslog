
import MyNavigation from '../../components/styledcomponent/ MyNavigation';
// import CustomerAdd from 'components/customer/CustomerAdd'
import CustomerShow from 'components/customer/CustomerShow'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';

import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    }
  },
});

const WgroupManagePage = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  return (
    <ThemeProvider theme={theme}>
       <li>정보 수정</li>
      <li>맴버 관리</li>
      <li>조직도 설정</li>
      {/* {isMobile && <MyNavigation />} */}
    </ThemeProvider>
  );
}

export default WgroupManagePage;