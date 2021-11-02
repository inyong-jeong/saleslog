import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import MyAppBar from 'components/styledcomponent/MyAppBar';



const CalendarRegister = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const navigateTo = () => history.goBack()
  const onSaveClick = () => {

  }

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })

  }, [])


  return (
    <>
      <MyAppBar
        navigateTo={navigateTo}
        showBackButton
        onSaveClick={onSaveClick}
        barTitle={'일정 등록하기'} />

      <div className='content_body'>



      </div>

    </>
  );
}


export default CalendarRegister