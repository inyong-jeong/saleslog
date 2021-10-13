import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Input from 'components/styledcomponent/Input'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import FullTabs from "components/styledcomponent/FullTabs";
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory } from 'react-router';
import { Modal, Divider, Button, Select, Checkbox, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getWorkGroupInfo, postWorkGroupDel } from 'redux/workgroup/actions';
import { errorMessage } from '../../../constants/commonFunc';
import cmm from 'constants/common';
const { Option } = Select;
const { TabPane } = FullTabs;

const WgroupMemberPage = (props) => {
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const dispatch = useDispatch()
  const [groupInfo, setGroupInfo] = useState()
  const [ivList, setIvList] = useState([])
  const [myinfo, setMyInfo] = useState([])
  const [inputs, setInputs] = useState(
    {
      checked: false,
      userpass: '',
    }
  )

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  //이전페이지
  const navigateTo = () => history.push('/main/workgroup')

  useEffect(() => {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
    //워크그룹 정보 가져오기
    //dispatch(getWorkGroupInfo.call())   

  }, [])

  //워크그룹 정보 fetch 후
  useEffect(() => {
    if (state.data && state.data.length > 0) {
      setGroupInfo(state.data[0]);
    }
  }, [state.data])

  //워크그룹 삭제
  const delWorkgroup = () => {
    if (inputs.checked) {
      dispatch(postWorkGroupDel.call({ userpass: inputs.userpass }))
    }
  }

  //워크그룹 삭제 fetch 후
  useEffect(() => {
    if (state.postWorkGroupDelRes) {
      console.log('state.postWorkGroupDelRes',state.postWorkGroupDelRes)
      if (state.postWorkGroupDelRes.state == false) {        
        errorMessage(state.postWorkGroupDelRes.message);
        state.postWorkGroupDelRes = null;
      } else {
        console.log('state.postWorkGroupDelRes',state.postWorkGroupDelRes)
        state.postWorkGroupDelRes = null;
        //워크그룹 선택
        history.push('/main/workgroup/chgwgroup')
      }
    }
  }, [state.postWorkGroupDelRes])

  const onChkChange = (e) => {
    console.log('checked::::::::::::::::::', e.target.checked)
    setInputs({ ...inputs, checked: e.target.checked })
  }

  const handlePassChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div>
      {<MyAppBar
        barTitle={'워크그룹 삭제'}
        showBackButton
        navigateTo={navigateTo}

      />}
      <div className='content_body'>
      <div style={{ flex: 1, flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div style={{ width: '100%', fontSize: 14, verticalAlign: 'middle', padding: 10, }}>
          <ExclamationCircleOutlined
            style={{ color: '#C90000', position: 'relative', top: -4 }} />&nbsp;
          이 워크그룹을 정말로 삭제 하시겠습니까?<br />
          모든 게시물, 첨부파일, 크레딧을 포함하여 이 워크그룹과 관련한 모든 데이터가 영구적으로 삭제되며, 되돌릴 수 없습니다.
        </div>
        <div style={{ width: '100%', fontSize: 12, padding: 10, verticalAlign: 'middle', }}>
          <Input.Password
            name='userpass'
            onChange={handlePassChange}
            value={inputs.comp_name}
            required
            placeholder="현재 비밀번호를 입력해주세요."
            margin="normal"
          />
        </div>
        <div style={{ width: '100%', marginTop: 10 }}>
          <Checkbox onChange={onChkChange}
            style={{ fontSize: 12, padding: 10, }}
          >워크그룹의 모든 데이터가 삭제됨을 충분히 이해 했습니다.
          </Checkbox>
        </div>
        <div
          style={{
            position: ((isMobile) ? 'absolute' : ''),
            width: '100%',
            height: ((isMobile) ? 60 : 200),
            bottom: 60,
            textAlign: 'center',
            justifyContent: 'flex-end'

          }}>
          <Button
            style={{
              width: ((isMobile) ? '90%' : '50%'),
              top: ((isMobile) ? 0 : 100),
              height: 50,
              bottom: 10,
              padding: 5
            }}
            onClick={() => {
              delWorkgroup()
            }}
          >워크그룹 삭제</Button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default WgroupMemberPage;