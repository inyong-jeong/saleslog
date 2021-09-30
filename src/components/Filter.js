import React from 'react'
import { Col, Row, Select } from 'antd'
import cmm from 'constants/common';

export default function Filter({
  selectStyle, biglist, selectedOrganization1, onOrganizationSelectChange1, middlelist, onOrganizationSelectChange2
  , selectedOrganization2, smalllist, onOrganizationSelectChange3, selectedOrganization3, onOrganizationUserSelectChange
  , selectedItems, filteredOptions
}) {
  return (
    <div>
      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='대분류'
            style={selectStyle}
            options={biglist && biglist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            value={selectedOrganization1}
            onChange={onOrganizationSelectChange1}
          />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='중분류'
            style={selectStyle}
            options={middlelist && middlelist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            onChange={onOrganizationSelectChange2}
            value={selectedOrganization2} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='소분류'
            style={selectStyle}
            options={smalllist && smalllist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            onChange={onOrganizationSelectChange3}
            value={selectedOrganization3} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='멤버'
            mode='multiple'
            style={selectStyle}
            onChange={onOrganizationUserSelectChange}
            value={selectedItems}
          >
            {filteredOptions && filteredOptions.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  )
}
