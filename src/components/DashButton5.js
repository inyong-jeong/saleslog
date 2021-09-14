import React from 'react'
import StyledButton from 'components/styledcomponent/Button'
import { Row, Col } from 'antd'

export default function DashButton5({ first, second, third, fourth, fifth }) {
  return (
    <div>
      <Row gutter={6}>
        <Col sm={4} xs={4} md={4} lg={4}>
          <StyledButton>{first}</StyledButton>
        </Col>
        <Col sm={4} xs={4} md={4} lg={4}>
          <StyledButton>{second}</StyledButton>
        </Col>
        <Col sm={4} xs={4} md={4} lg={4}>
          <StyledButton>{third}</StyledButton>
        </Col >
        <Col sm={4} xs={4} md={4} lg={4}>
          <StyledButton>{fourth}</StyledButton>
        </Col>
        <Col sm={4} xs={4} md={4} lg={4}>
          <StyledButton>{fifth}</StyledButton>
        </Col>
      </Row>
    </div>
  )
}
