import CustomerRegisterInfo from '../customer/CustomerRegisterInfo'
import MyAppBar from "../../components/styledcomponent/MyAppBar";
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
const CustomerAdd = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  return (
    <>

      <CustomerRegisterInfo />
    </>
  );
}

export default CustomerAdd;