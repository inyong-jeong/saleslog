import React, { useState } from 'react';
import { TreeSelect, Row, Col } from 'antd';
import Select from 'react-select';
const { TreeNode } = TreeSelect;

const SalesLogFilter = () => {

  const [value, setValue] = useState()
  const onChange = () => {
    setValue(value);
  }
  function callback(key) {
    console.log(key);
  }
  const selectStyle = {
    control: (defaultStyle) => ({ ...defaultStyle, border: '1px solid #AAAAAA' }),
    indicatorSeparator: () => { }
  }
  return (
    <>
      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='대분류'
            styles={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='중분류'
            styles={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='소분류'
            styles={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='멤버'
            styles={selectStyle} />
        </Col>
      </Row>
      <Row className='mt-1'></Row>
      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='단계'
            styles={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='활동'
            styles={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='채널'
            styles={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='니즈'
            styles={selectStyle} />
        </Col>
      </Row>
    </>
  )

}
export default SalesLogFilter;