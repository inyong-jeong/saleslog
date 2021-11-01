import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import MyAppBar from 'components/styledcomponent/MyAppBar';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useDispatch } from 'react-redux';
const NotificationList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
  }, [])

  const history = useHistory()

  const navigateTo = () => {
    history.goBack()
  }

  return (
    <>
      <MyAppBar
        barTitle='알림 목록'
        navigateTo={navigateTo}
      />

      <div className='content_body'>

      </div>

    </>
  );
}

export default NotificationList