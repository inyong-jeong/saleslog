import React from 'react';
import CustomerAdd from 'components/customer/CustomerAdd';
import MyNavigation from '../../../components/styledcomponent/ MyNavigation';
import { useMediaQuery } from 'react-responsive';
import CustomerRegisterInfo from '../../../components/customer/CustomerRegisterInfo';

const CustomerRegisterPage = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  return (
    <div>
      <CustomerRegisterInfo />
    </div>
  );
}

export default CustomerRegisterPage;