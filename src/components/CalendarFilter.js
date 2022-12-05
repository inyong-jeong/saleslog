import React, { useState, useEffect } from 'react';
import { TreeSelect, Row, Col, Select } from 'antd';
import { useMediaQuery } from "react-responsive";
import { connect, useSelector } from 'react-redux';
import { getorganization, getorganizationusers } from 'redux/actions';
import { getUserInfo } from 'helpers/authUtils';


const CalendarFilter = (props) => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });


  const state = useSelector(state => state.Organization);
  const state2 = useSelector(state => state.SalesLog);

  let organlistResponse = state.organlistResponse;
  // 트리 데이터

  const [treedata, setTreedata] = useState([])
  const [selectedOrganization, setSelectedOrganization] = useState(undefined);
  const [selId, setSelId] = useState(props.id);
  const [selIdUser, setSelIdUser] = useState(props.id);
  const [selectedItems, setSelectedItems] = useState([])
  const [filteredlist, setFilteredlist] = useState([])
  const [filteredOptions, setFilteredOptions] = useState([])


  //부서별 사용자 조회
  const [data, setData] = useState({
    dept_idx: 0,
    typ: 'mine'
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

  useEffect(() => {
    props.getorganizationusers(data)
  }, [data])

  //부서조회 fetch 후
  useEffect(() => {
    if (organlistResponse && (selId === props.id) && getUserInfo().permission !== '9') {
      setTreedata(getTreeData(props.organizationlist))
      setSelId();
      // state2.StoredData ? props.setData({ ...props.data, 'dept_idx': state2.StoredData.data.dept_idx, 'pageno': 1 })
      //   : props.setData({ ...props.data, 'dept_idx': '', 'pageno': 1 })
      organlistResponse = false;
    }
  }, [organlistResponse])

  //부서 선택
  const handeltreeOnChange = (departmentId, label, extra) => {

    console.log(label);
    console.log(departmentId);

    if (departmentId) {
      setSelId(extra.allCheckedNodes[0].node.props.id);
      setSelIdUser(extra.allCheckedNodes[0].node.props.id);
      setSelectedOrganization(departmentId);
      // props.setData({ ...props.data, organization: departmentId, members: undefined })
      props.getorganizationusers({ dept_idx: departmentId, typ: 'tree' })
      // props.setData({ ...props.data, dept_idx: departmentId, pageno: 1, sales_man: '', members: undefined, organization: departmentId })
    } else {
      setSelectedOrganization(departmentId);
      // props.setData({ ...props.data, dept_idx: '', pageno: 1, sales_man: '', members: undefined, organization: departmentId })
      state2.StoredData.data.organization = undefined;
      props.getorganizationusers({ dept_idx: 0, typ: 'mine' })
    }
  }

  //맴버조회 fetch 후  
  useEffect(() => {
    if (state.organuserResponse && (selIdUser === props.id)) {
      const memList = props.organizationuserlist.map(v => v.user_name);
      const optList = memList && memList.filter((v) => !selectedItems.includes(v))
      setFilteredlist(memList);
      setFilteredOptions(optList);
      // const userlist = props.organizationuserlist.map(v => v.login_idx);
      // state2.StoredData ? props.setData({ ...props.data, 'dept_idx': '', 'pageno': 1 })
      // : props.setData({ ...props.data, 'dept_idx': '', 'pageno': 1 })
      setSelectedItems([]);
      setSelIdUser();
    }
  }, [state.organuserResponse])

  //멤버 선택
  const onOrganizationUserSelectChange = (label) => {
    if (label.length === 0) {
      let array = props.organizationuserlist.map(v => v.login_idx);
      // props.setData({ ...props.data, members: label, sales_man: array, pageno: 1 })
      state2.StoredData.data.members = [];
      setSelectedItems([])
    } else {
      setSelectedItems(label);
      let memberlist = filterList(label)
      // props.setData({ ...props.data, members: label, sales_man: memberlist, pageno: 1 })
    }
  }

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


  return (
    <>
      {(getUserInfo().permission !== '9')
        && <Row gutter={6}>
          <Col sm={12} xs={12} md={12} lg={12}>
            <TreeSelect
              style={{ width: '100%' }}
              dropdownMatchSelectWidth={false}
              value={state2.StoredData ? state2.StoredData.data.organization : selectedOrganization}
              treeLine={true}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treedata}
              placeholder={'조직 전체'}
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
              value={state2.StoredData ? state2.StoredData.data.members : selectedItems}
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
        </Row>}
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

export default connect(mapStateToProps, mapStateToDispatch)(CalendarFilter);