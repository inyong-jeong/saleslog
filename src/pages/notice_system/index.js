import React from 'react'
import MyAppBar from '../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';

const SystemNotice = () => {
  const history = useHistory()
  const navigateTo = () => {
    history.goBack()
  }
  return (
    <>
      <MyAppBar
        barTitle='시스템 공지사항'
        showBackButton
        navigateTo={navigateTo}
      />
    </>
  );
}

export default SystemNotice;