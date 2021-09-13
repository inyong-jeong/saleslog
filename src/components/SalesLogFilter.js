import React, { useState, useEffect } from 'react';
import { TreeSelect, Row, Col } from 'antd';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
  getorganization, getorganizationusers, searchLogList
} from 'redux/actions';

const { TreeNode } = TreeSelect;

const SalesLogFilter = (props) => {

  const [selectedOrganization1, setSelectedOrganization1] = useState(undefined);
  const [selectedOrganization2, setSelectedOrganization2] = useState(undefined);
  const [selectedOrganization3, setSelectedOrganization3] = useState(undefined);

  const [activity, setActivity] = useState('');
  const [leadactivity, setLeadActivity] = useState('');
  const [channel, setChannel] = useState('');

  const salesActivityOption =
    [{ label: '니즈조사', value: '0050001' },
    { label: '동향/정보수집', value: '0050002' },
    { label: '제안', value: '0050003' }];

  const salesChannelOption =
    [{ label: '전화', value: '0050001' },
    { label: '이메일', value: '0050002' },
    { label: '대면', value: '0050003' },
    { label: '행사참여', value: '0050004' },
    { label: '온라인 리서치', value: '0050005' },
    { label: '도서-전문정보', value: '0050006' },
    { label: '소셜 커뮤니티', value: '0050007' },
    { label: '기타', value: '005000' }];

  const leadActivityOption =
    [{ label: '조사', value: '0050001' },
    { label: '접촉', value: '0050002' },
    { label: '제안', value: '0050003' },
    { label: '검증', value: '0050004' }];

  const [selectedOrganizationuser, setSelectedOrganizationUser] = useState(undefined);

  const [filterdata, setFilterData] = useState({
    dept_idx: 0,
    typ: 'lvl'
  })

  useEffect(() => {
    props.getorganization(filterdata)
  }, [])

  useEffect(() => {
    if (selectedOrganization1) {
      props.getorganization(filterdata)
    }
  }, [selectedOrganization1])

  useEffect(() => {
    if (selectedOrganization2) {
      props.getorganization(filterdata)
    }
  }, [selectedOrganization2])

  useEffect(() => {
    if (selectedOrganization3) {
      props.getorganizationusers(filterdata)
    }
  }, [selectedOrganization3])

  useEffect(() => {
    if (selectedOrganizationuser) {
      props.setData({ ...props.data, 'srch': selectedOrganizationuser })
      props.searchLogList(props.data)
    }
  }, [selectedOrganizationuser])

  const selectStyle = {
    control: (defaultStyle) => ({ ...defaultStyle, border: '1px solid #AAAAAA' }),
    indicatorSeparator: () => { }
  }

  const onOrganizationSelectChange1 = (v) => {
    console.log(v)
    setSelectedOrganization1(v);
    setFilterData({ ...filterdata, 'dept_idx': v.value })
  }

  const onOrganizationSelectChange2 = (v) => {
    setSelectedOrganization2(v);
    setFilterData({ ...filterdata, 'dept_idx': v.value })

  }
  // document.addEventListener('touchstart', handler, { passive: true });
  const onOrganizationSelectChange3 = (v) => {

    setSelectedOrganization3(v);
    setFilterData({ ...filterdata, 'dept_idx': v.value })
  }

  const onOrganizationUserSelectChange = (v) => {
    setSelectedOrganizationUser(v);
    setFilterData({ ...filterdata, 'dept_idx': v.value, 'typ': 'tree' })
  }

  const onLeadActivity = (option) => {
    setLeadActivity(option.value);
    props.setData({
      ...props.data,
      'sales_lead_gb': option.value
    })
  }

  const onSalesActivity = (option) => {
    // setActivitylIndex(option)
    setActivity(option.value);
    props.setData({
      ...props.data,
      'sales_goal': option.value
    })
  };

  const onSalesChannel = (option) => {
    // setChannelIndex(option);
    setChannel(option.value);
    props.setData({
      ...props.data,
      'sales_activity': option.value
    })
  };
  return (
    <>
      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='대분류'
            styles={selectStyle}
            options={props.organizationlist && props.organizationlist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            value={selectedOrganization1}
            onChange={onOrganizationSelectChange1}
          />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='중분류'
            styles={selectStyle}
            options={selectedOrganization1 && props.organizationlist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            onChange={onOrganizationSelectChange2}
            value={selectedOrganization2} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='소분류'
            styles={selectStyle}
            options={selectedOrganization2 && props.organizationlist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            onChange={onOrganizationSelectChange3}
            value={selectedOrganization3} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='멤버'
            styles={selectStyle}
            onChange={onOrganizationUserSelectChange}
            value={selectedOrganizationuser}
          />
        </Col>
      </Row>
      <Row className='mt-1'></Row>
      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='단계'
            styles={selectStyle}
            // isDisabled={true}
            options={leadActivityOption}
            value={leadActivityOption.value}
            onChange={onLeadActivity} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='활동'
            onChange={onSalesActivity}
            options={salesActivityOption}
            value={salesActivityOption.value}
            styles={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='채널'
            options={salesChannelOption}
            value={salesChannelOption.value}
            onChange={onSalesChannel}

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

const mapStateToProps = (state) => {
  const { organizationlist, bigresponse } = state.Organization;
  return { organizationlist, bigresponse };
};
const mapStateToDispatch = {
  getorganization: getorganization.call,
  getorganizationusers: getorganizationusers.call,
  searchLogList: searchLogList.call,
}

export default connect(mapStateToProps, mapStateToDispatch)(SalesLogFilter);