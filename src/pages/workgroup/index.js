
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
      test123
      {/* {isMobile && <MyNavigation />} */}
    </ThemeProvider>
  );
}

export default WgroupManagePage;