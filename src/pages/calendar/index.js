import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SET_NAVIBAR_SHOW } from '../../constants/actionTypes';
import MyAppBar from '../../components/styledcomponent/MyAppBar';
import MyCalendar from '../../components/calendar/MyCalendar';

const CalendarPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  // const navigateTo = () => {
  //   history.push('/main/calendar/register')
  // }
  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })

  }, [])


  return (
    <>
      <MyAppBar barTitle={'일정'} />
      <MyCalendar />
    </>
  );
}


export default CalendarPage