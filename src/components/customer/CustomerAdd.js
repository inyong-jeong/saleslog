import CustomerRegisterInfo from '../customer/CustomerRegisterInfo'
import MyAppBar from "./MyAppBar";
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const CustomerAdd = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  return (
    <>
      {isMobile && <MyAppBar barTitle={'고객사 등록하기'} showBackButton />}
      <CustomerRegisterInfo />
    </>
  );
}

export default CustomerAdd;