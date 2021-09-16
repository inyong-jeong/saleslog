import React, { useState } from 'react'
import StyledButton from 'components/styledcomponent/Button'
import { Row, Col, DatePicker } from 'antd'
import moment from 'moment';

const { RangePicker } = DatePicker;

export default function DashButton({ tab, onSelected, defaultSelected, onChange }) {

  const [selected, setSelected] = useState(defaultSelected);


  const handleOnClick = (e) => {
    e.preventDefault();
    if (onSelected) {
      onSelected(e.target.id)
      setSelected(e.target.id)
    }
  }

  return (
    <>
      <Row gutter={[6, 6]}>
        {tab && tab.map((v) => {
          return <Col sm={6} xs={6} md={6} lg={6}>
            <StyledButton key={v.id} id={v.id} onClick={handleOnClick}>{v.label}</StyledButton>
          </Col>
        })
        }
      </Row>
    </>
  )
}


