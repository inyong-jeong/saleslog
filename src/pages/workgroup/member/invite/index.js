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
import { Divider, Button, Select, Avatar, Dropdown, Menu } from 'antd';
import { getProfileInfo, postGroupInvite, getInviteList, postInviteDel } from 'redux/workgroup/actions';
import { ReactComponent as MoreIcon } from 'assets/icons/main/menudots.svg'
const { Option } = Select;
const { TabPane } = FullTabs;

const WgroupMemberPage = () => {
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const dispatch = useDispatch()
  const [ivList, setIvList] = useState([])
  const [myinfo, setMyInfo] = useState([])
  const [inputs, setInputs] = useState(
    {
      login_id: '',
      invite_email: '',
      permission: '9',
    }
  )

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  //이전페이지
  const navigateTo = () => history.push('/main/workgroup/member')

  useEffect(() => {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    }
    )

    //내 프로필 가져오기
    dispatch(getProfileInfo.call())

  }, [])

  //내 프로필 fetch 후
  useEffect(() => {
    if (state.getProfileInfoRes) {
      console.log(state.getProfileInfoRes)
      setInputs({ ...inputs, login_id: state.getProfileInfoRes[0].login_idx })
      setMyInfo(state.getProfileInfoRes[0]);
    }
  }, [state.getProfileInfoRes])

  //초대
  const inviteMember = () => {
    dispatch(postGroupInvite.call(inputs))
  }

  //초대 fetch 후
  useEffect(() => {
    if (state.postGroupInviteRes) {
      console.log(state.postGroupInviteRes)
    }
  }, [state.postGroupInviteRes])

  //다시초대
  const reInviteMember = (login_id, email, permission) => {
    dispatch(postGroupInvite.call({ login_id: login_id, invite_email: email, permission: permission }))
  }

  //초대 취소
  const cancelInviteMember = (iv_idx) => {
    console.log('iv_idx:::::::::', iv_idx)
    dispatch(postInviteDel.call({ iv_idx: iv_idx }))
  }

  //초대 취소 fetch 후
  useEffect(() => {
    if (state.postInviteDelRes) {
      state.postInviteDelRes = null;
      //발송리스트 
      dispatch(getInviteList.call())
    }
  }, [state.postInviteDelRes])


  //tab
  const onTabChange = (key) => {
    switch (key) {
      case '2':
        console.log('tab change:::::::::::::::', key)
        //발송리스트 
        dispatch(getInviteList.call())
        break
      default:
      //
    }
  }

  //발송리스트 fetch 후
  useEffect(() => {
    if (state.getInviteListRes) {
      console.log(state.getInviteListRes);
      setIvList(state.getInviteListRes);
    }
  }, [state.getInviteListRes])


  const handleChange = (e) => {
    setInputs({ ...inputs, invite_email: e.target.value })
  }

  const handlePermChange = (value) => {
    console.log('select:::::::::', value)
    setInputs({ ...inputs, permission: value })
  }

  console.log(ivList);


  return (
    <div>
      {<MyAppBar
        barTitle={'초대관리'}
        showBackButton
        navigateTo={navigateTo}

      />}
      <div className='content_body'>
        <FullTabs defaultActiveKey="1" onChange={onTabChange} >
          <TabPane tab="초대하기" key="1" >
            <div style={{ flex: 1, flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div style={{ width: '100%', }}>
                <label style={{ fontSize: 12 }}>초대하고자 하는 사람의 이메일 주소를 입력하세요</label>
                <Input name='inv_email'
                  onChange={handleChange}
                  value={inputs.invite_email}
                  required
                  placeholder="이메일 입력해주세요."
                  margin="normal"
                />
              </div>
              <div style={{ width: '100%', marginTop: 10 }}>
                <label style={{ fontSize: 12 }}>초대하고자 하는 사람의 멤버구분을 선택하세요</label>
                <Select value={inputs.permission}
                  style={{ width: '100%', height: 50, fontSize: 16 }}
                  size={'large'}
                  onChange={handlePermChange}>
                  <Option value={'0'}>Master</Option>
                  <Option value={'1'}>Chief</Option>
                  <Option value={'2'}>Manager</Option>
                  <Option value={'9'}>Staff</Option>
                </Select>
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
                    inviteMember()
                  }}

                >초대장 보내기</Button>
              </div>

            </div>
          </TabPane>
          ㅍ
          <TabPane tab="발송내역" key="2">

            <InfiniteScroll
              hasMore={true}
              dataLength={ivList.length} >

              <List style={{ width: '98%' }}>
                {(ivList.length > 0 ? ivList.map((item, index) => {
                  const {
                    iv_idx,
                    login_idx,
                    invite_email,
                    permissions,
                    cre_dt,
                    user_name,
                    title } = item;
                  return (
                    <div key={index} >
                      <ListItem key={index}
                        style={{
                          padding: 5,
                          height: 65,
                          backgrouondColor: '#fefefe'
                        }}>
                        <div
                          style={{ display: 'flex', width: '100%' }} >
                          <div style={{ width: 50, maxWidth: 50, textAlign: 'center' }}>
                            <Avatar
                              src={''}
                              size={40} />
                          </div>
                          <div style={{ width: '90%', paddingLeft: 10 }}>
                            <div style={{ fontSize: 14, fontWeight: 500, height: 21, color: '#111111' }}>{invite_email}</div>
                            <div style={{ fontSize: 12, fontWeight: 350, lineHeight: '18px', color: '#666666' }}>{user_name}&nbsp;{title}님이 초정장을 보냈습니다.</div>
                            <div style={{ fontSize: 12, fontWeight: 350, lineHeight: '18px', color: '#666666' }}>{cre_dt}</div>
                          </div>
                          <div style={{ flex: 1, fontSize: 12, width: '10%', maxWidth: 50, paddingRight: 10, textAlign: 'right', right: 0, alignItems: 'flex-end' }}>
                            <Dropdown key={login_idx} overlay={
                              <Menu key={login_idx} style={{ width: 200 }}>
                                <Menu.Item key={1} onClick={() => {
                                  reInviteMember(login_idx, invite_email, permissions)
                                }} >다시 보내기
                                </Menu.Item>
                                <Menu.Item key={2} onClick={() => {
                                  cancelInviteMember(iv_idx)
                                }} >초대 취소
                                </Menu.Item>
                                <Divider dashed style={{ margin: 2 }} />
                              </Menu>}
                              placement="bottomRight"
                              trigger={['click', 'hover']} >
                              <MoreIcon />
                            </Dropdown>
                          </div>
                        </div>
                      </ListItem>
                      <Divider dashed style={{ margin: 3 }} />
                    </div>
                  )
                }) : <>
                  <p>발송 내역이 없습니다.</p>
                </>)

                }
              </List>
            </InfiniteScroll>


          </TabPane>
        </FullTabs>
      </div>
    </div>
  );
}

export default WgroupMemberPage;