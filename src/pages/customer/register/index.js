import React from 'react';
import CustomerAdd from 'components/customer/CustomerAdd';
import MyNavigation from '../../../components/styledcomponent/ MyNavigation';
import { useMediaQuery } from 'react-responsive';

const CustomerRegisterPage = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  return (
    <div>
      <CustomerAdd />
      {/* {isMobile && <MyNavigation />} */}
    </div>
  );
}

export default CustomerRegisterPage;