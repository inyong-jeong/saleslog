import React, { useState, useEffect } from 'react';
import { TreeSelect, Row, Col, Select } from 'antd';
// import Select from 'react-select';

import { connect } from 'react-redux';
import {
  getorganization, getorganizationusers
} from 'redux/actions';
import cmm from 'constants/common';


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
  const [needs, setNeeds] = useState('');

  const [chgCombo, setChgCombo] = useState(0);

  const [selectedOrganizationuser, setSelectedOrganizationUser] = useState(undefined);


  const salesActivityOption =
    [{ label: '선택없음', value: '' },
    { label: '니즈조사', value: '0030001' },
    { label: '동향/정보수집', value: '0030002' },
    { label: '제안', value: '0030003' }];

  const salesChannelOption =
    [{ label: '선택없음', value: '' },
    { label: '전화', value: '0040001' },
    { label: '이메일', value: '0040002' },
    { label: '대면', value: '0040003' },
    { label: '행사참여', value: '0040004' },
    { label: '온라인 리서치', value: '0040005' },
    { label: '도서-전문정보', value: '0040006' },
    { label: '소셜 커뮤니티', value: '0040007' },
    { label: '기타', value: '0040008' }];

  const leadActivityOption =
    [{ label: '선택없음', value: '' },
    { label: '발굴', value: '0020001' },
    { label: '접촉', value: '0020002' },
    { label: '제안', value: '0020003' },
    { label: '검증', value: '0020004' }];

  const NeedsOption =
    [{ label: '선택없음', value: '' },
    { label: '전략니즈', value: '전략' },
    { label: '제품니즈', value: '제품' },
    { label: '개인니즈', value: '개인' },
    { label: '상품니즈', value: '상품' }];


  //하위부서 조회
  const [filterdata, setFilterData] = useState({
    dept_idx: 0,
    typ: 'lvl'
  })

  //부서별 사용자 조회
  const [data, setData] = useState({
    dept_idx: 0,
    typ: 'tree'
  })

  //마운트 될 때 
  useEffect(() => {
    //
    props.getorganization(filterdata)

  }, [])


  //맴버조회 fetch 후  
  useEffect(() => {
    if (props.organizationuserlist) {
      const userlist = props.organizationuserlist.map(v => v.login_idx);
      console.log(userlist)
      props.setData({ ...props.data, 'sales_man': userlist, 'pageno': 1 })
      setSelectedItems([]);
    }
  }, [props.organizationuserlist])


  //부서조회 fetch 후
  useEffect(() => {
    console.log('부서조회:::::::::::::::', chgCombo, props.organizationlist)
    if (props.organizationlist) {
      if (chgCombo === 0) {
        setBigList(props.organizationlist)
      } else if (chgCombo === 1) {
        setMiddleList(props.organizationlist)
      } else if (chgCombo === 2) {
        setSmallList(props.organizationlist)
      }
      setChgCombo(0)
    }
  }, [props.organizationlist])


  // 대분류 선택
  useEffect(() => {
    console.log('selidx:::22222222222:', selectedOrganization1)
    if (!cmm.isEmpty(selectedOrganization1)) {
      //props.getorganization(filterdata)
      setChgCombo(1)
    }
  }, [selectedOrganization1])

  //중분류 선택
  useEffect(() => {
    if (!cmm.isEmpty(selectedOrganization2)) {
      //props.getorganization(filterdata)
      setChgCombo(2)
    }
  }, [selectedOrganization2])

  // 소분류 선택
  useEffect(() => {
    if (!cmm.isEmpty(selectedOrganization3)) {
      //props.getorganizationusers(data)
      setChgCombo(3)
    }
  }, [selectedOrganization3])

  // 부서 선택 후
  useEffect(() => {
    console.log('chgCombo::::::::::::::', chgCombo, selectedOrganization1)
    if (chgCombo === 1) {
      //하위부서 조회
      props.getorganization({ dept_idx: selectedOrganization1, typ: 'lvl' })
      //부서별 맴버 조회
      props.getorganizationusers({ dept_idx: selectedOrganization1, typ: 'tree' })

    } else if (chgCombo === 2) {

      //하위부서 조회
      props.getorganization({ dept_idx: selectedOrganization2, typ: 'lvl' })
      //부서별 맴버 조회
      props.getorganizationusers({ dept_idx: selectedOrganization2, typ: 'tree' })

    } else if (chgCombo === 3) {
      //하위부서 조회
      props.getorganization({ dept_idx: selectedOrganization3, typ: 'lvl' })
      //부서별 맴버 조회
      props.getorganizationusers({ dept_idx: selectedOrganization3, typ: 'tree' })

    }
  }, [chgCombo])

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
    console.log('delidx:::vvvvvvvvvvvvvv::::::::::::::', v)
    setSelectedOrganization1(v);
    setSelectedOrganization2('');
    setSelectedOrganization3('');
    setMiddleList([]);
    setSmallList([]);
    if (v !== '') {
      props.getorganizationusers({ dept_idx: v, typ: 'tree' })
    } else {
      props.getorganizationusers({ dept_idx: 0, typ: 'tree' })
    }

    // setBigList(props.organizationlist)
    //setFilterData({ ...filterdata, 'dept_idx': v })
    //setChgNo(1)

    //setData({ ...data, 'dept_idx': v })
  }

  const onOrganizationSelectChange2 = (v) => {
    setSelectedOrganization2(v);
    setSelectedOrganization3('');
    setSmallList([]);
    if (v !== '') {
      props.getorganizationusers({ dept_idx: v, typ: 'tree' })
    } else {
      props.getorganizationusers({ dept_idx: selectedOrganization1, typ: 'tree' })
    }
    // setMiddleList(props.organizationlist)
    //setFilterData({ ...filterdata, 'dept_idx': v })
    //setData({ ...data, 'dept_idx': v })
  }
  const onOrganizationSelectChange3 = (v) => {
    setSelectedOrganization3(v);
    if (v !== '') {
      props.getorganizationusers({ dept_idx: v, typ: 'tree' })
    } else {
      props.getorganizationusers({ dept_idx: selectedOrganization2, typ: 'tree' })
    }

    // setSmallList(props.organizationlist)
    //setFilterData({ ...filterdata, 'dept_idx': v })
    //setData({ ...data, 'dept_idx': v })
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
      'sales_lead_gb': option
    })
  }

  const onSalesActivity = (option) => {
    // setActivitylIndex(option)
    setActivity(option.value);
    props.setData({
      ...props.data,
      'sales_goal': option
    })
  };

  const onSalesChannel = (option) => {
    // setChannelIndex(option);
    setChannel(option.value);
    props.setData({
      ...props.data,
      'sales_activity': option
    })
  };

  const onNeeds = (option) => {
    // setChannelIndex(option);
    setNeeds(option.value)
    console.log(option)
    // setChannel(option.value);
    props.setData({
      ...props.data,
      'need_cod': option
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
            options={biglist && cmm.selComboList(biglist)}
            value={selectedOrganization1}
            onChange={onOrganizationSelectChange1}
          />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='중분류'
            style={selectStyle}
            options={middlelist && cmm.selComboList(middlelist)}
            onChange={onOrganizationSelectChange2}
            value={selectedOrganization2} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='소분류'
            style={selectStyle}
            options={smalllist && cmm.selComboList(smalllist)}
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
            options={NeedsOption}
            value={NeedsOption.value}
            onChange={onNeeds}
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