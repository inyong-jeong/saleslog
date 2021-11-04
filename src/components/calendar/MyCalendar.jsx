import React, { useRef } from 'react'
import { Calendar, Badge, Popover, Button } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/es/date-picker/locale/ko_KR';

export default function MyCalendar() {

  const locationRef = useRef();
  const dateCellRender = () => {

  }
  const monthCellRender = () => {

  }
  const onPanelChange = (e, value) => {
    console.log(e, value)

  }
  // const onSelect = (e, value) => {
  //   return (
  //     <>
  //       <Popover title={'제목'} content={'내용'} trigger='click'></Popover>
  //     </>
  //   )
  // }
  const onChange = (e, value) => {
    console.log(e, value)
    console.log(locationRef)
  }

  return (
    <>
      <Calendar
        locale={locale}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onPanelChange={onPanelChange}
        // onSelect={onSelect}
        onChange={onChange}
      />
    </>
  )
}
