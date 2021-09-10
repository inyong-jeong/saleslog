import CustomerShow from 'components/customer/CustomerShow'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    }
  },
});

const CustomerManagePage = () => {


  return (
    <ThemeProvider theme={theme}>
      <CustomerShow />
    </ThemeProvider>
  );
}

export default CustomerManagePage;