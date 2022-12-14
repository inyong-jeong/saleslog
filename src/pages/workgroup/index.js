import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import IconLabel from 'components/IconLabel';
import { useHistory } from 'react-router';
import { Modal, Divider, Avatar } from 'antd';
import StyledButton from '../../components/styledcomponent/Button';
import { getWorkGroupInfo, getWorkGroupList, postWorkGroupChange } from 'redux/workgroup/actions';
import cmm from 'constants/common';
import { ReactComponent as EditIcon } from '../../assets/icons/workgroup/edit.svg'
import { ReactComponent as MemberIcon } from '../../assets/icons/workgroup/member.svg'
import { ReactComponent as OrgIcon } from '../../assets/icons/workgroup/org.svg'
import { getUserInfo, removeAll, reAccessToken } from 'helpers/authUtils';
import { alertMessage } from '../../constants/commonFunc';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const WgroupManagePage = () => {

  const marginStyle = {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0
  }

  const myInfo = getUserInfo();
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
  const [myOrgId, setmyOrgId] = useState(null)

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });


  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })
    dispatch(getWorkGroupInfo.call())
  }, [])

  useEffect(() => {
    if (state.getWorkGroupListRes) {
      setWgList(state.getWorkGroupListRes)
    }

  }, [state.getWorkGroupListRes])

  useEffect(() => {
    if (state.postWorkGroupChangeRes) {
      state.postWorkGroupChangeRes = null
      console.log('workGroup change')
      //??????????????? ?????????
      let ReToken = reAccessToken().then((res) => {
        if (res == 'NoToken') {
          console.log('LOGIN PUSH :: MainRoute NoToken ', res)
          removeAll();
          history.push('/signin')

        } else if (res == 'ReToken') {
          //props.history.replace(props.history.location)
          window.location.reload();
        }
      })

      //removeAll();
      //history.push('/signin')
    }
  }, [state.postWorkGroupChangeRes])

  useEffect(() => {
    if (!state.getWorkGroupInfoRes) return
    setmyOrgId(state.data[0].org_idx)

  }, [state.getWorkGroupInfoRes])

  useEffect(() => {
    if (!cmm.isEmpty(data) && data.length > 0) {
      setInputs({ ...inputs, data: data[0], prevImg: (cmm.isEmpty(data[0].logo_url) ? '' : cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + data[0].logo_url) })
    }
  }, [data])

  const navigateTo = () => history.goBack()

  const navigateNext = () => {
    dispatch(getWorkGroupList.call())
    setIsShowModal(true);
  }

  const handleWGroupRegister = () => {
    history.push('/main/workgroup/register');
    setIsShowModal(false)
  }

  const handleChangeWorkGroup = (idx) => {

    if (idx === myOrgId) return alertMessage('?????? ?????????????????????.')
    confirm({
      title: '??????????????? ?????????????????????????',
      icon: <ExclamationCircleOutlined />,
      cancelText: '??????',
      okText: '??????',
      onOk() {
        dispatch(postWorkGroupChange.call({ chg_idx: idx }))
      }
    })

  }

  return (
    <>
      <MyAppBar
        barTitle={(cmm.isEmpty(inputs.data)) ? '????????????' : inputs.data.organization}
        navigateTo={navigateTo}
        navigateNext={navigateNext}
      />
      <div className='content_body'>
        <div style={{
          cursor: 'pointer',
          marginTop: 10,
          color: '#333',
          fontSize: 14,
          fontWeight: 500
        }}>
          <IconLabel title="???????????? ?????? ??????" pathUri="main/workgroup/update" src={<EditIcon />} />
          <Divider style={marginStyle} />
          <IconLabel title="?????? ??????" pathUri="main/workgroup/member" src={<MemberIcon />} />
          <Divider style={marginStyle} />

          {
            myInfo.permission == 0 || myInfo.permission == -1000 ?
              <>
                <IconLabel title="????????? ??????" pathUri="main/workgroup/dept" src={<OrgIcon />} />
                <Divider style={marginStyle} />
              </>
              : null}

        </div>
        <div style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 19,
          color: '#666',
          fontSize: 14,
          fontWeight: 500
        }}>
          <IconLabel title="???????????? ?????????" pathUri="main/workgroup/outwgroup" isIcon={false} />

          {myInfo.permission == 0 ?
            <>
              <div>&nbsp; |&nbsp; </div>
              <IconLabel title="???????????? ??????" pathUri="main/workgroup/delwgroup" isIcon={false} />
            </> : null}

        </div>

        <Modal
          title="???????????? ??????"
          style={{ positon: 'fixed', left: 0, top: 100, cursor: 'pointer' }}
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
              }}>
              <div
                style={{
                  margin: 5,
                  fontSize: 16,
                  width: '90%',
                  backgroundColor: '#333333',
                  height: 48,
                }}>
                <StyledButton
                  key={1}
                  onClick={() => {
                    handleWGroupRegister()
                  }}>???????????? ??????</StyledButton>
              </div>
            </div>
          ]}
        >
          <InfiniteScroll
            hasMore={true}
            dataLength={wgList.length} >
            <List>
              {wgList ? wgList.map((item, index) => {
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
                          handleChangeWorkGroup(org_idx)
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
                        <div style={{ fontSize: 12, width: 70, color: '#aaaaaa' }}>
                          <span>??????</span><br />
                          <span>??????</span>
                        </div>
                        <div style={{ fontSize: 12, width: 40, paddingLeft: 10, textAlign: 'right', right: 10, justifyContent: 'flex-end' }}>
                          <span>{member_cnt}</span><br />
                          <span>{accounts_cnt}</span>
                        </div>
                      </div>
                    </ListItem>
                    <Divider dashed style={{ marginLeft: 0, marginRight: 0, marginTop: 2, marginBottom: 2, }} />
                  </div>
                )
              }) : null
              }
            </List>
          </InfiniteScroll>

        </Modal>
      </div>
    </>
  );
}

export default WgroupManagePage;