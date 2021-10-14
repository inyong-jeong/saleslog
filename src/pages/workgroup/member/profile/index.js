
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory, useParams } from 'react-router';
import { Divider, Avatar, Select, TreeSelect } from 'antd';
import { getGroupMemberDetail, getDeptInfo, postGroupMemberUpd } from 'redux/workgroup/actions';
import cmm from 'constants/common';
import { base64Dec } from 'constants/commonFunc';
import { getUserInfo } from 'helpers/authUtils';

const { Option } = Select;
const WgroupMemberPage = () => {

  const myInfo = getUserInfo();
  const labelTextStyle = {
    fontSize: 12,
    color: '#666666',
    fontWeight: 400,
    paddingLeft: 5,
  }

  const grayResultTextStyle = {
    fontSize: 14,
    color: '#999999',
    fontWeight: 400,
    paddingLeft: 5
  }
  const blackResultTextStyle = {
    fontSize: 14,
    color: '#111111',
    fontWeight: 400,
    paddingLeft: 5
  }


  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const [memberData, setMemberData] = useState(null)
  const [treedata, setTreedata] = useState([])
  const [inputs, setInputs] = useState(
    {
      login_idx: '',
      permissions: 9,
      dept_idx: '',
    }
  )

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });
  //이전페이지
  const navigateTo = () => history.push('/main/workgroup/member')

  //권한 select
  const handleChange = (value) => {
    setInputs({ ...inputs, permissions: value });
  }
  //소속 select
  const handeltreeOnChange = (value) => {
    setInputs({ ...inputs, dept_idx: value });
  }


  useEffect(() => {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    }
    )
    setInputs({ ...inputs, login_idx: base64Dec(params.memberId) })
    //setMemberId(base64Dec(params.memberId))

    //워크그룹 맴버 정보 
    dispatch(getGroupMemberDetail.call({ login_idx: base64Dec(params.memberId) }))

    //부서 정보 가져오기
    dispatch(getDeptInfo.call({ dept_idx: 0, typ: 'tree' }))

  }, [])


  //맴버정보 fetch 후
  useEffect(() => {
    if (!cmm.isEmpty(state.getGroupMemberDetailRes)) {
      setMemberData(state.getGroupMemberDetailRes)
      console.log('select permission::::::::::::::::::::::::', state.getGroupMemberDetailRes[0].permissions)
      setInputs({ ...inputs, permissions: state.getGroupMemberDetailRes[0].permissions, dept_idx: state.getGroupMemberDetailRes[0].dept_idx });
    }
  }, [state.getGroupMemberDetailRes])

  //부서리스트 fetch 후
  useEffect(() => {

    if (!cmm.isEmpty(state.getDeptInfoRes)) {
      console.log('treedata:::::::::::::::::::::', getTreeData(state.getDeptInfoRes))
      setTreedata(getTreeData(state.getDeptInfoRes))
    }
  }, [state.getDeptInfoRes])

  const onSaveClick = () => {
    dispatch(postGroupMemberUpd.call(inputs))
    return
  }


  //맴버 수정 fetch 후
  useEffect(() => {

    if (!cmm.isEmpty(state.postGroupMemberUpdRes)) {

    }
  }, [state.postGroupMemberUpdRes])


  const getTreeData = (array) => {

    if (!array || array.length <= 0) {
      return null;
    }

    var map = {};
    for (var i = 0; i < array.length; i++) {
      var obj = { "value": array[i]['dept_idx'], "title": array[i]['dept_name'] };
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


  return (
    (memberData && memberData.length > 0) &&
    <div >
      <MyAppBar
        barTitle={'멤버 프로필'}
        showBackButton
        navigateTo={navigateTo}

        onSaveClick={onSaveClick}
      />
      <div className='content_body'>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Avatar
            src={(cmm.isEmpty(memberData[0].thumb_url) ? '' : cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + memberData[0].thumb_url)}
            shape='square' size={(isMobile) ? 90 : 120} />

          <div style={{ flexGrow: 2, marginLeft: 10, }}>
            <label style={labelTextStyle}>이름 </label><br />
            <label style={blackResultTextStyle}>{memberData[0].user_name}</label>
            <Divider dashed style={{ margin: 3 }} />
          </div>
        </div>
        <Divider />
        <div>
          <label style={labelTextStyle}>휴대폰 번호 </label><br />
          <label style={blackResultTextStyle}>{memberData[0].phone_number}</label>
          <Divider style={{ width: '100%', margin: 5 }} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label style={labelTextStyle}>이메일 </label><br />
          <label style={grayResultTextStyle}>{memberData[0].email}</label>
          <Divider style={{ width: '100%', margin: 5 }} />
        </div>
        <div style={{ marginTop: 10 }}>
          <div><label style={labelTextStyle}>멤버 구분 </label></div>
          <Select value={inputs.permissions}
            style={{ width: '100%', height: 25 }}
            onChange={handleChange}>
            <Option value={'0'}>Master</Option>
            <Option value={'1'}>Chief</Option>
            <Option value={'2'}>Manager</Option>
            <Option value={'9'}>Staff</Option>
          </Select>
          <Divider style={{ width: '100%', margin: 5 }} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label style={labelTextStyle}>소속</label><br />
          <TreeSelect
            style={{ width: '100%' }}
            value={inputs.dept_idx}
            treeLine={true}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treedata}
            placeholder={memberData[0].dept_name}
            treeDefaultExpandAll
            onChange={handeltreeOnChange} />

          <Divider style={{ width: '100%', margin: 5 }} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label style={labelTextStyle}>최근 접속 일시</label><br />
          <label style={grayResultTextStyle}>{memberData[0].upd_dt}</label>
          <Divider style={{ width: '100%', margin: 5 }} />
        </div>
      </div>
    </div>
  );
}

export default WgroupMemberPage;