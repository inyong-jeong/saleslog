import React from 'react'
import { Calendar, Badge } from 'antd';
import 'moment/locale/ko';
import locale from 'antd/es/date-picker/locale/ko_KR';

export default function MyCalendar() {


  const dateCellRender = () => {

  }
  const monthCellRender = () => {

  }
  const onPanelChange = () => {

  }
  const onSelect = () => {

  }

  return (
    <>
      <Calendar
        locale={locale}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
      />

    </>
  )
}
