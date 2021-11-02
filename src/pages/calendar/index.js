import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SET_NAVIBAR_SHOW } from '../../constants/actionTypes';
import MyAppBar from '../../components/styledcomponent/MyAppBar';

const CalendarPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })

  }, [])


  return (
    <>
      <MyAppBar barTitle={'일정'} />
      <div className='content_body'>

      </div>

    </>
  );
}


export default CalendarPage