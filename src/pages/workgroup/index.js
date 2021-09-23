import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import IconLabel from 'components/IconLabel';
import { useHistory } from 'react-router';
import { Modal, Divider, Button, Avatar } from 'antd';
import { getWorkGroupInfo, getWorkGroupList, postWorkGroupChange } from 'redux/workgroup/actions';
import cmm from 'constants/common';
import { ReactComponent as EditIcon } from '../../assets/icons/workgroup/edit.svg'
import { ReactComponent as MemberIcon } from '../../assets/icons/workgroup/member.svg'
import { ReactComponent as OrgIcon } from '../../assets/icons/workgroup/org.svg'
import { IconButton } from '@material-ui/core';

const WgroupManagePage = (props) => {
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const dispatch = useDispatch()
  const data = state.data;
  const [isShowModal, setIsShowModal] = useState(false)
  const [wgList, setWgList] = useState([])
  const [inputs, setInputs] = useState(
    {
      data: null,
    }
  )


  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  //이전페이지
  const navigateTo = () => history.push('/main/customer')

  //워크그룹 리스트 팝업
  const navigateNext = () => {
    //워크그룹 리스트 가져오기
    dispatch(getWorkGroupList.call())
    setIsShowModal(true);
  }

  //워크그룹 체인지
  const handelWGroupChange = (idx) => {
    //워크그룹 변경
    dispatch(postWorkGroupChange.call({ chg_idx: idx }))
  }

  //워크그룹 생성
  const handelWGroupRegi = () => {
    //워크그룹 생성페이지 이동
    history.push('/main/workgroup/register');
    setIsShowModal(false)
  }

  useEffect(() => {
    if (state.getWorkGroupListRes) {
      console.log('wglist:::::::::::::::', state.getWorkGroupListRes)
      setWgList(state.getWorkGroupListRes)
    }

  }, [state.getWorkGroupListRes])

  useEffect(() => {
    if (state.postWorkGroupChangeRes) {
      console.log('wglist:::::::::::::::', state.postWorkGroupChangeRes)

      //워크그룹 정보 가져오기
      dispatch(getWorkGroupInfo.call())
      setIsShowModal(false)
    }

  }, [state.postWorkGroupChangeRes])


  useEffect(() => {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    }
    )
    //워크그룹 정보 가져오기
    dispatch(getWorkGroupInfo.call())

  }, [])

  useEffect(() => {
    if (!cmm.isEmpty(data)) {
      setInputs({ ...inputs, data: data[0], prevImg: (cmm.isEmpty(data[0].logo_url) ? '' : cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + data[0].logo_url) })
    }

  }, [data])

  return (
    <>
      <MyAppBar
        barTitle={(cmm.isEmpty(inputs.data)) ? '워크그룹' : inputs.data.organization}
        navigateTo={navigateTo}
        navigateNext={navigateNext}
      />
      <div style={{ cursor: 'pointer', marginTop: 20 }}>
        <IconLabel title="정보 수정" pathUri="main/workgroup/update" src={<EditIcon />} />
        <Divider style={{ margin: 10 }} />
        <IconLabel title="맴버 관리" pathUri="main/workgroup/member" src={<MemberIcon />} />
        <Divider style={{ margin: 10 }} />
        <IconLabel title="조직도 설정" pathUri="main/workgroup/dept" src={<OrgIcon />} />
        <Divider style={{ margin: 10 }} />
      </div>
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 340 }}>
        <IconLabel title="워크그룹 나가기" pathUri="main/workgroup/outwgroup" isIcon={false} />
        <div>&nbsp; |&nbsp; </div>
        <IconLabel title="워크그룹 삭제" pathUri="main/workgroup/delwgroup" isIcon={false} />
      </div>
      <Modal
        title="워크그룹 선택"
        style={{ positon: 'fixed', left: 0, top: 100 }}
        visible={isShowModal}
        width={((isMobile) ? '90%' : '50%')}
        onOk={() => { setIsShowModal(false) }}
        onCancel={() => { setIsShowModal(false) }}
        footer={[
          <div key={1}
            style={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              left: 0,
              width: '100%',
              height: 70
            }}><div
              style={{
                margin: 5,
                fontSize: 16,
                width: '90%',
                backgroundColor: '#333333',
                height: 48,
              }}><Button
                ghost
                style={{
                  fontSize: 16,
                  width: '100%',
                  height: '100%'
                }}
                key={1}
                onClick={() => {
                  handelWGroupRegi()
                }}>워크그룹 생성</Button></div>
          </div>
        ]}
      >
        <InfiniteScroll
          hasMore={true}
          dataLength={wgList.length} >
          <List>
            {((wgList) ? wgList.map((item, index) => {
              const { organization, org_domain, org_idx, logo_url, member_cnt, accounts_cnt } = item;
              return (
                <div key={index} >
                  <ListItem key={index}
                    style={{
                      padding: 5,
                      height: 50,
                      backgrouondColor: '#fefefe'
                    }}>
                    <div
                      style={{ display: 'flex', width: '100%' }}
                      onClick={() => {
                        handelWGroupChange(org_idx)
                      }}>
                      <Avatar
                        src={(cmm.isEmpty(item.logo_url)) ? '' : cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + item.logo_url}
                        shape='square'
                        size={44}
                        style={{ width: 60 }} />
                      <div style={{ width: '80%', paddingLeft: 10 }}>
                        <span style={{ fontSize: 14 }}>{organization}</span><br />
                        <span style={{ fontSize: 12 }}>{org_domain}</span>
                      </div>
                      <div style={{ fontSize: 12, width: 70, paddingLeft: 10, color: '#aaaaaa' }}>
                        <span>맴버</span><br />
                        <span>고객사</span>
                      </div>
                      <div style={{ fontSize: 12, width: 30, paddingLeft: 10, textAlign: 'right', right: 10, justifyContent: 'flex-end' }}>
                        <span>{member_cnt}</span><br />
                        <span>{accounts_cnt}</span>
                      </div>
                    </div>
                  </ListItem>
                  <Divider dashed style={{ margin: 3 }} />
                </div>
              )
            }) : '')

            }
          </List>
        </InfiniteScroll>

      </Modal>
    </>
  );
}

export default WgroupManagePage;