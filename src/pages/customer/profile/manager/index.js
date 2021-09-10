import React from 'react';
import { useLocation } from 'react-router';
import MyAppBar from '../../../../components/styledcomponent/MyAppBar';
import { useMediaQuery } from 'react-responsive';

const ManagerProfilePage = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  const navigateTo = () => {

  }

  const onEditClick = () => {

  }

  const location = useLocation()
  console.log(location.state)

  return (
    <div>
      {isMobile && <MyAppBar barTitle={'담당자 프로필 '}
        showBackButton
        navigateTo={navigateTo}
        onEditClick={onEditClick}
      />}

      {/* loading 끝나면 뿌리기  */}

    </div>
  );
}

export default ManagerProfilePage;