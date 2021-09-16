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
          return <Col sm={8} xs={8} md={4} lg={4}>
            <StyledButton key={v.id} id={v.id} onClick={handleOnClick}>{v.label}</StyledButton>
          </Col>
        })
        }
        <RangePicker className='col-sm-12 col-xs-12 col-md-6 col-lg-6'
          placeholder={['0000.00.00', '0000.00.00']}
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          onChange={onChange}
        />
      </Row>
    </>
  )
}


