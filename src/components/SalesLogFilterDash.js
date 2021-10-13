import React, { useState, useEffect } from 'react';
import { TreeSelect, Row, Col, Select } from 'antd';
import { connect } from 'react-redux';
import {
  getorganizationDash, getorganizationusersDash
} from 'redux/actions';
import { useMediaQuery } from "react-responsive";

const SalesLogFilterDash = (props) => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  const [selectedOrganization, setSelectedOrganization] = useState(undefined);
  const [selId, setSelId] = useState(props.id);
  const [selIdUser, setSelIdUser] = useState(props.id);
  const [treedata, setTreedata] = useState([])
  const [selectedOrganizationuser, setSelectedOrganizationUser] = useState(undefined);
  const [selectedItems, setSelectedItems] = useState([])
  const [filteredlist, setFilteredlist] = useState([])
  const [filteredOptions, setFilteredOptions] = useState([])

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
  const handeltreeOnChange = (v, label, extra) => {
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
            maxTagCount={isMobile ? 2 : 3} >
            {filteredOptions && filteredOptions.map((item, index) => (
              <Select.Option key={index} id={props.id} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row className='mt-1'></Row>
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