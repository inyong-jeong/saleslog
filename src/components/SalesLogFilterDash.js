import React, { useState, useEffect } from 'react';
import { TreeSelect, Row, Col, Select } from 'antd';
// import Select from 'react-select';

import { connect } from 'react-redux';
import {
  getorganizationDash, getorganizationusersDash
} from 'redux/actions';
import cmm from 'constants/common';



const SalesLogFilterDash = (props) => {
  const [selectedOrganization, setSelectedOrganization] = useState(undefined);
  const [selectedOrganization1, setSelectedOrganization1] = useState(undefined);
  const [selectedOrganization2, setSelectedOrganization2] = useState(undefined);
  const [selectedOrganization3, setSelectedOrganization3] = useState(undefined);
  const [selId, setSelId] = useState(props.id);
  const [selIdUser, setSelIdUser] = useState(props.id);

  const [treedata, setTreedata] = useState([])
  
  const [chgCombo, setChgCombo] = useState(0);
  const [selectedOrganizationuser, setSelectedOrganizationUser] = useState(undefined);

  const [selectedItems, setSelectedItems] = useState([])
  const [filteredlist, setFilteredlist] = useState([])
  const [filteredOptions, setFilteredOptions] = useState([])
  //const filteredlist = props.organizationuserDashRes && props.organizationuserDashRes.map(v => v.user_name);

  

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


  //부서별 사용자 조회
  const [data, setData] = useState({
    dept_idx: 0,
    typ: 'tree'
  })

  //마운트 될 때 
  useEffect(() => {
    //부서 정보 가져오기
    props.getorganizationDash({ dept_idx: 0, typ: 'tree' })

  }, [])


  //맴버조회 fetch 후  
  useEffect(() => {
    
    if (props.organizationuserDashRes && (selIdUser === props.id)) {
      const memList = props.organizationuserDashRes.map(v => v.user_name);
      const optList = memList && memList.filter((v) => !selectedItems.includes(v)) 
      setFilteredlist(memList);
      setFilteredOptions(optList);

      
      const userlist = props.organizationuserDashRes.map(v => v.login_idx);
      props.setData({ ...props.data, sales_man: userlist })
      setSelectedItems([]);
      setSelIdUser()
    }
  }, [props.organizationuserDashRes])


  //부서조회 fetch 후
  useEffect(() => {
    if (props.organizationDashRes && (selId == props.id)) {
      setTreedata(getTreeData(props.organizationDashRes))
      setSelId()
    }
  }, [props.organizationDashRes])


  // 멤버 선택
  useEffect(() => {
    if (selectedOrganizationuser) {

      //console.log(selectedOrganizationuser)
      props.setData({ ...props.data, 'sales_man': selectedOrganizationuser, 'pageno': 1 })
    }
  }, [selectedOrganizationuser])

  
  useEffect(() => {
    //console.log('data::::change:::::',data)
    props.getorganizationusersDash(data)
  }, [data])

  const selectStyle = { width: '100%' }

  //부서데이타 treedata 변환
  const getTreeData = (array) => {

    if (!array || array.length <= 0) {
      return null;
    }

    var map = {};
    for (var i = 0; i < array.length; i++) {
      var obj = { "value": array[i]['dept_idx'], "title": array[i]['dept_name'], "id": props.id };
      obj.children = [];
      map[obj.value] = obj;
      var parent = array[i]['parent_idx'] || '-';

      if (!map[parent]) {
        map[parent] = {
          children: []
        };
      }
      map[parent].children.push(obj);
    }

    return map['-'].children;

  }


  //부서 선택
  const handeltreeOnChange = (v,label, extra) => {
    if (v) {
      //console.log('부서선택:::',v, label, extra.allCheckedNodes[0].node.props.id, props.id)
      setSelId(extra.allCheckedNodes[0].node.props.id);
      setSelIdUser(extra.allCheckedNodes[0].node.props.id);  
      setSelectedOrganization(v);
      props.getorganizationusersDash({ dept_idx: v, typ: 'tree' })
    } else {
      setSelectedOrganization(v);
      props.getorganizationusersDash({ dept_idx: 0, typ: 'tree' })
    }

  }


  function filterList(label) {
    let list = []
    for (let i = 0; i < props.organizationuserDashRes.length; i++) {
      for (let j = 0; j < label.length; j++) {
        if (label[j] === props.organizationuserDashRes[i].user_name) {
          list = list.concat(props.organizationuserDashRes[i].login_idx);
        } else if (label === []) {
          list = [];
        }
      }
    }
    return list
  }

  //맴버 선택
  const onOrganizationUserSelectChange = (label) => {
    setSelectedItems(label);
    //console.log(filterList(label));
    let memberlist = filterList(label)
    setSelectedOrganizationUser(memberlist);
    // setFilterData({ ...filterdata, 'dept_idx': v, 'typ': 'tree' })
    // setData({ ...data, 'dept_idx': v })
  }


  //콤보박스 선택없음 추가
  const selComboList = (v, id) => {
    let rtn = [];

    rtn[0] = { value: '', label: '선택없음' };
    for (let i = 0; i < v.length; i++) {
      rtn[i + 1] = { value: v[i].dept_idx, label: v[i].dept_name, id: id };
    }
    return rtn;
  }
  

  //const filteredlist = props.organizationuserDashRes && props.organizationuserDashRes.map(v => v.user_name);
  //const filteredOptions = filteredlist && filteredlist.filter((v) => !selectedItems.includes(v)) 
  return (
    <>
      <Row gutter={6}>
        <Col sm={12} xs={12} md={12} lg={12}>
          <TreeSelect
            style={{ width: '100%' }}
            value={selectedOrganization}
            treeLine={true}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treedata}
            placeholder={'부서 전체'}
            treeDefaultExpandAll
            allowClear
            id={props.id}
            onChange={handeltreeOnChange} />
        </Col>
        <Col sm={12} xs={12} md={12} lg={12}>
          <Select placeholder='멤버 전체'
            mode='multiple'
            style={selectStyle}
            onChange={onOrganizationUserSelectChange}
            value={selectedItems}
            id={props.id}
          >
            {filteredOptions && filteredOptions.map((item, index) => (              
              <Select.Option key={index} id={props.id} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row className='mt-1'></Row>
      {/* <Row gutter={6}>
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
      </Row> */}
    </>
  )

}

const mapStateToProps = (state) => {
  const { organizationDashRes, organizationuserDashRes } = state.Organization;
  return { organizationDashRes, organizationuserDashRes };
};
const mapStateToDispatch = {
  getorganizationDash: getorganizationDash.call,
  getorganizationusersDash: getorganizationusersDash.call,
}

export default connect(mapStateToProps, mapStateToDispatch)(SalesLogFilterDash);