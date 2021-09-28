import React, { useState, useEffect } from 'react';
import { TreeSelect, Row, Col, Select } from 'antd';
// import Select from 'react-select';

import { connect } from 'react-redux';
import {
  getorganization, getorganizationusers
} from 'redux/actions';


const SalesLogFilter = (props) => {

  const [selectedOrganization1, setSelectedOrganization1] = useState(undefined);
  const [selectedOrganization2, setSelectedOrganization2] = useState(undefined);
  const [selectedOrganization3, setSelectedOrganization3] = useState(undefined);

  const [biglist, setBigList] = useState(undefined);
  const [middlelist, setMiddleList] = useState(undefined);
  const [smalllist, setSmallList] = useState(undefined);


  const [activity, setActivity] = useState('');
  const [leadactivity, setLeadActivity] = useState('');
  const [channel, setChannel] = useState('');
  const [key, setKey] = useState(0);

  const [selectedOrganizationuser, setSelectedOrganizationUser] = useState(undefined);


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


  const [filterdata, setFilterData] = useState({
    dept_idx: 0,
    typ: 'lvl'
  })

  const [data, setData] = useState({
    dept_idx: 0,
    typ: 'tree'
  })

  //마운트 될 때 
  useEffect(() => {
    props.getorganization(filterdata)
  }, [])

  // 대분류 선택
  useEffect(() => {
    if (selectedOrganization1) {
      props.getorganization(filterdata)
      setKey(1)
    }
  }, [selectedOrganization1])

  console.log(props.organizationuserlist);
  useEffect(() => {
    if (props.organizationuserlist) {
      const userlist = props.organizationuserlist.map(v => v.login_idx);
      console.log(userlist)
      props.setData({ ...props.data, 'sales_man': userlist, 'pageno': 1 })

    }
  }, [props.organizationuserlist])
  useEffect(() => {
    if (props.organizationlist) {
      if (key === 0) {
        setBigList(props.organizationlist)
      } else if (key === 1) {
        setMiddleList(props.organizationlist)
      } else if (key === 2) {
        setSmallList(props.organizationlist)
      }
    }
  }, [props.organizationlist])

  //중분류 선택
  useEffect(() => {
    if (selectedOrganization2) {
      props.getorganization(filterdata)
      setKey(2)
    }
  }, [selectedOrganization2])

  // 소분류 선택
  useEffect(() => {
    if (selectedOrganization3) {
      props.getorganizationusers(data)
      // setKey(3)
    }
  }, [selectedOrganization3])

  // 멤버 선택
  useEffect(() => {
    if (selectedOrganizationuser) {

      console.log(selectedOrganizationuser)
      props.setData({ ...props.data, 'sales_man': selectedOrganizationuser, 'pageno': 1 })
    }
  }, [selectedOrganizationuser])

  useEffect(() => {
    props.getorganizationusers(data)
  }, [data])

  const selectStyle =
    { width: '100%' }

  const onOrganizationSelectChange1 = (v) => {
    console.log(v)
    setSelectedOrganization1(v);
    // setBigList(props.organizationlist)
    setFilterData({ ...filterdata, 'dept_idx': v })
    setData({ ...data, 'dept_idx': v })
  }

  const onOrganizationSelectChange2 = (v) => {
    setSelectedOrganization2(v);
    // setMiddleList(props.organizationlist)
    setFilterData({ ...filterdata, 'dept_idx': v })
    setData({ ...data, 'dept_idx': v })
  }
  const onOrganizationSelectChange3 = (v) => {
    setSelectedOrganization3(v);
    // setSmallList(props.organizationlist)
    setFilterData({ ...filterdata, 'dept_idx': v })
    setData({ ...data, 'dept_idx': v })
  }

  function filterList(label) {
    let list = []
    for (let i = 0; i < props.organizationuserlist.length; i++) {
      for (let j = 0; j < label.length; j++) {
        if (label[j] === props.organizationuserlist[i].user_name) {
          list = list.concat(props.organizationuserlist[i].login_idx);
        } else if (label === []) {
          list = [];
        }
      }
    }
    return list
  }

  const onOrganizationUserSelectChange = (label) => {
    setSelectedItems(label);
    console.log(filterList(label));
    let memberlist = filterList(label)
    setSelectedOrganizationUser(memberlist);
    // setFilterData({ ...filterdata, 'dept_idx': v, 'typ': 'tree' })
    // setData({ ...data, 'dept_idx': v })
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



  const [selectedItems, setSelectedItems] = useState([])
  const filteredlist = props.organizationuserlist && props.organizationuserlist.map(v => v.user_name);
  const filteredOptions = filteredlist && filteredlist.filter((v) => !selectedItems.includes(v))
  return (
    <>
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
      <Row className='mt-1'></Row>
      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='단계'
            style={selectStyle}
            // disabled={true}
            options={leadActivityOption}
            value={leadActivityOption.value}
            onChange={onLeadActivity} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='활동'
            onChange={onSalesActivity}
            options={salesActivityOption}
            value={salesActivityOption.value}
            style={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='채널'
            options={salesChannelOption}
            value={salesChannelOption.value}
            onChange={onSalesChannel}
            style={selectStyle} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='니즈'
            style={selectStyle} />
        </Col>
      </Row>
    </>
  )

}

const mapStateToProps = (state) => {
  const { organizationlist, organizationuserlist } = state.Organization;
  return { organizationlist, organizationuserlist };
};
const mapStateToDispatch = {
  getorganization: getorganization.call,
  getorganizationusers: getorganizationusers.call,
}

export default connect(mapStateToProps, mapStateToDispatch)(SalesLogFilter);