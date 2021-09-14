import React from 'react'
import StyledButton from 'components/styledcomponent/Button'
import { Row, Col } from 'antd'

export default function DashButton({ first, second, third, fourth }) {
  return (
    <div>
      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <StyledButton>{first}</StyledButton>
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <StyledButton>{second}</StyledButton>
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <StyledButton>{third}</StyledButton>
        </Col >
        <Col sm={6} xs={6} md={6} lg={6}>
          <StyledButton>{fourth}</StyledButton>
        </Col>
      </Row>
    </div>
  )
}
