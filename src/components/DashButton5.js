import React, { useState } from 'react'
import StyledButton from 'components/styledcomponent/Button'
import { Row, Col } from 'antd'


export default function DashButton5({ tab, onSelected, defaultSelected, onChange }) {

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
      <Row justify='center' gutter={[6, 6]}>
        {tab && tab.map((v) => {
          return <Col sm={4} xs={4} md={4} lg={4}>
            <StyledButton key={v.id} id={v.id} onClick={handleOnClick}>{v.label}</StyledButton>
          </Col>
        })
        }
      </Row>
    </>
  )
}


