import React, { useEffect, useState } from 'react'
import { Collapse, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { postAnniversary, postSystemNotice, postWorkgroupNotice } from '../../redux/etc/actions';
import { useHistory } from 'react-router';
import { base64Enc } from 'constants/commonFunc';
import { ReactComponent as BdayLogo } from '../../../src/assets/icons/main/bday.svg'
import { ReactComponent as Notice } from '../../../src/assets/icons/main/notice.svg'
import CustomUp from '../styledcomponent/CustomUpButton';
const { Panel } = Collapse

export default function RightMenu() {

  const dispatch = useDispatch()
  const history = useHistory()
  const state = useSelector(state => state.Etc)
  const [bday, setBday] = useState([])
  const [mday, setMday] = useState([])
  const [sysNotice, setSysNotice] = useState([])
  const [wgNotice, setWgNotice] = useState([])

  useEffect(() => {
    dispatch(postAnniversary.call())
    dispatch(postSystemNotice.call())
    dispatch(postWorkgroupNotice.call())
  }, [])

  useEffect(() => {
    if (state.postAnniveraryResponse) {
      setBday(state.postAnniveraryResponse[0])
      setMday(state.postAnniveraryResponse[1])
    }
    if (state.postSysResponse) {
      setSysNotice(state.postSysResponse)
    }
    if (state.postWGResponse) {
      setWgNotice(state.postWGResponse)
    }
  }, [state.loading])


  const customPanelStyle = {
    background: '#fff',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };
  const handleSysNotice = (item) => {
    history.push(`/main/etc/notice/system/detail/${base64Enc(item.b_idx)}`)
  }
  const handleWgNotice = (item) => {
    history.push(`/main/etc/notice/group/detail/${base64Enc(item.b_idx)}`)

  }

  const handleAnniversary = (item) => {
    history.push(`/main/manager/profile/${base64Enc(item.acc_idx)}/${base64Enc(item.accm_idx)}`)
  }

  const noticeDesc = <p style={{ fontSize: 12, color: '#666666' }}> <Notice />최근 5개 글만 보입니다. </p>
  const NoticeItem = ({ item, onClick }) => (
    <>
      <div
        style={{ display: 'flex', margin: 2, padding: 3, alignItems: 'center', cursor: 'pointer' }}
        onClick={(e, item) => onClick(e, item)} >
        <p style={{
          margin: 0,
          fontWeight: 500,
          fontSize: 14,
          color: '#111111',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: 130
        }}>{item.title}</p>
        <p style={{ margin: 0, color: '#666666', fontSize: 12 }}>
          작성일 : {item.cre_dt}
        </p>
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  )

  const DateItem = ({ item, onClick }) => (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      <div style={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
        <p style={{ margin: 0, fontWeight: 500, fontSize: 14, color: '#111111' }}>{item.man_name}</p>
        <p style={{ margin: 0, fontWeight: 400, fontSize: 12, color: '#666666', marginLeft: 5, flexGrow: 2 }}>{item.account_name}</p>
        <p style={{ margin: 0, color: '#666666', fontSize: 12 }}>날짜 : {item.days}</p>
      </div>
      <Divider style={{ margin: 0 }} />
    </div>

  )

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#fff',
      borderLeft: 'solid',
      borderWidth: 1,
      borderColor: '#EAEAEA',
    }}>
      <div>
        {/* defaultActiveKey={['1']} */}
        <Collapse bordered={false} style={{ backgroundColor: '#fff' }} expandIconPosition='right'>
          <Panel header="생일" key="1" style={customPanelStyle}>
            <div>
              <p style={{ fontSize: 12, color: '#666666' }}><BdayLogo /> 오늘 기준 7일 내 생일만 표시됩니다.</p>
              <div className='mt-1' />
              {
                bday.map((item, index) => (
                  <DateItem key={item.b_idx} item={item} onClick={() => handleAnniversary(item)} />
                ))
              }
            </div>
          </Panel>
          <Panel header="결혼 기념일" key="2" style={customPanelStyle}>
            <div>
              <p style={{ fontSize: 12, color: '#666666' }}><BdayLogo /> 오늘 기준 7일 내 결혼 기념일만 표시됩니다.</p>
              <div className='mt-1' />
              {
                mday.map((item, index) => (
                  <DateItem key={item.b_idx} item={item} onClick={() => handleAnniversary(item)} />
                ))
              }
            </div>
          </Panel>
          <Panel header="시스템 공지사항" key="3" style={customPanelStyle}>
            <div>
              {noticeDesc}
              {
                sysNotice.map((item, index) => (
                  <NoticeItem key={item.accm_idx} item={item} onClick={() => handleSysNotice(item)} />
                ))
              }
            </div>
          </Panel>
          <Panel header="워크그룹 공지사항" key="4" style={customPanelStyle}>
            <div>
              {noticeDesc}
              {
                wgNotice.map((item, index) => (
                  <NoticeItem key={item.b_idx} item={item} onClick={() => handleWgNotice(item)} />
                ))
              }
            </div>
          </Panel>
        </Collapse>
      </div>
      {/* <CustomUp /> */}
    </div>
  )
}
