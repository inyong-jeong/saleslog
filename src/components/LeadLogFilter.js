import React, { useState, useEffect } from 'react';
import { TreeSelect, Row, Col, Select } from 'antd';
// import Select from 'react-select';
import { useMediaQuery } from "react-responsive";

import { connect, useSelector } from 'react-redux';
import {
  getorganization, getorganizationusers
} from 'redux/actions';
import cmm from 'constants/common';


const LeadLogFilter = (props) => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });


  const state = useSelector(state => state.Organization);
  let organlistResponse = state.organlistResponse;
  // 트리 데이터

  const [treedata, setTreedata] = useState([])
  const [selectedOrganization, setSelectedOrganization] = useState(undefined);
  const [selId, setSelId] = useState(props.id);
  const [selIdUser, setSelIdUser] = useState(props.id);
  const [selectedItems, setSelectedItems] = useState([])
  const [filteredlist, setFilteredlist] = useState([])
  const [filteredOptions, setFilteredOptions] = useState([])


  const [activity, setActivity] = useState('');
  const [leadactivity, setLeadActivity] = useState('');
  const [channel, setChannel] = useState('');
  const [needs, setNeeds] = useState('');

  const [selectedOrganizationuser, setSelectedOrganizationUser] = useState(undefined);

  const salesActivityOption =
    [{ label: '전체', value: '' },
    { label: '니즈조사', value: '0030001' },
    { label: '동향/정보수집', value: '0030002' },
    { label: '제안', value: '0030003' }];

  const salesChannelOption =
    [{ label: '전체', value: '' },
    { label: '전화', value: '0040001' },
    { label: '이메일', value: '0040002' },
    { label: '대면', value: '0040003' },
    { label: '행사참여', value: '0040004' },
    { label: '온라인 리서치', value: '0040005' },
    { label: '도서-전문정보', value: '0040006' },
    { label: '소셜 커뮤니티', value: '0040007' },
    { label: '기타', value: '0040008' }];

  const leadActivityOption =
    [{ label: '전체', value: '' },
    { label: '발굴', value: '0020001' },
    { label: '접촉', value: '0020002' },
    { label: '제안', value: '0020003' },
    { label: '검증', value: '0020004' }];

  const NeedsOption =
    [{ label: '전체', value: '' },
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


  //마운트 될 때 
  useEffect(() => {
    //부서정보 가져오기
    props.getorganization(data)

  }, [])


  //부서조회 fetch 후
  useEffect(() => {
    if (organlistResponse) {
      setTreedata(getTreeData(props.organizationlist))
      setSelId()
      organlistResponse = false;
    }
  }, [organlistResponse])


  //맴버조회 fetch 후  
  useEffect(() => {
    if (props.organizationuserlist) {

      const memList = props.organizationuserlist.map(v => v.user_name);
      const optList = memList && memList.filter((v) => !selectedItems.includes(v))
      setFilteredlist(memList);
      setFilteredOptions(optList);


      const userlist = props.organizationuserlist.map(v => v.login_idx);
      props.setData({ ...props.data, 'sales_man': userlist, 'pageno': 1 })
      setSelectedItems([]);
      setSelIdUser();

    }
  }, [props.organizationuserlist])

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

  //멤버 이름 넣으면 해당 멤버의 login_idx 반환 하는 함수
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

  //멤버 선택
  const onOrganizationUserSelectChange = (label) => {
    if (label.length === 0) {
      let array = props.organizationuserlist.map(v => v.login_idx);
      console.log(array);
      setSelectedOrganizationUser(array)
      setSelectedItems([])
    } else {
      console.log(label);
      setSelectedItems(label);
      console.log(filterList(label));
      let memberlist = filterList(label)
      setSelectedOrganizationUser(memberlist);
    }
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
    setChannel(option.value);
    props.setData({
      ...props.data,
      'need_cod': option
    })
  };

  //부서 선택
  const handeltreeOnChange = (v, label, extra) => {
    if (v) {
      setSelId(extra.allCheckedNodes[0].node.props.id);
      setSelIdUser(extra.allCheckedNodes[0].node.props.id);
      setSelectedOrganization(v);
      props.getorganizationusers({ dept_idx: v, typ: 'tree' })
    } else {
      setSelectedOrganization(v);
      props.getorganizationusers({ dept_idx: 0, typ: 'tree' })
    }
  }

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
            onChange={handeltreeOnChange}
            id={props.id}
          />
        </Col>
        <Col sm={12} xs={12} md={12} lg={12}>
          <Select placeholder='멤버 전체'
            mode='multiple'
            style={selectStyle}
            onChange={onOrganizationUserSelectChange}
            value={selectedItems}
            maxTagCount={isMobile ? 2 : 3}
            id={props.id}
          >
            {filteredOptions && filteredOptions.map((item, index) => (
              <Select.Option key={index} value={item} >
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
            disabled={false}
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

export default connect(mapStateToProps, mapStateToDispatch)(LeadLogFilter);