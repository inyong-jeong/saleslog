import CustomerRegisterInfo from '../customer/CustomerRegisterInfo'
import MyAppBar from "../../components/styledcomponent/MyAppBar";
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
const CustomerAdd = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  const history = useHistory()

  const navigateTo = () => history.push('/main/customer')
  return (
    <>
      {isMobile && <MyAppBar barTitle={'고객 등록하기'} showBackButton navigateTo={navigateTo} />}
      <CustomerRegisterInfo />
    </>
  );
}

export default CustomerAdd;