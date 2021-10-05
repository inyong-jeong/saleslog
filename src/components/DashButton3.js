import React, { useState, useEffect } from 'react'
import StyledButton from 'components/styledcomponent/Button'
import { Button } from 'antd';
import { Row, Col, DatePicker } from 'antd'
import moment from 'moment';
import { defaults } from 'autoprefixer';
import cmm from 'constants/common';

const { RangePicker } = DatePicker;

export default function DashButton({ tab, onSelected, defaultSelected, onChange }) {

  const [selected, setSelected] = useState(defaultSelected);

  const handleOnClick = (id) => {
    //e.preventDefault();
    if (onSelected) {
      onSelected(id)
      setSelected(id)
    }
  }


  //마운트 될 때 
  useEffect(() => {
    //
  }, [])



  return (
    <>
      <Row gutter={[6, 6]}>
        {tab && tab.map((v) => {
          return <Col sm={6} xs={6} md={6} lg={6}>
            <Button style={{ width: '100%', height: 40, color: (selected == v.id) ? '#ffffff' : '#111111', fontSize: 14, backgroundColor: (selected == v.id) ? '#333333' : '#ffffff', border: (selected == v.id) ? '1px solid #333333' : '1px solid #e1e1e1', padding: 1, margin: 0 }}
              key={v.id} id={v.id} onClick={() => { handleOnClick(v.id) }}>{v.label}</Button>
          </Col>
        })
        }
      </Row>
    </>
  )
}


