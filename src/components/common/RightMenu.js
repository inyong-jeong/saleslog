import React, { useEffect, useState } from 'react'
import { Collapse, Divider, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { postAnniversary, postSystemNotice, postWorkgroupNotice } from '../../redux/etc/actions';
import { useHistory } from 'react-router';
import { base64Enc, ConvertDate } from 'constants/commonFunc';
import { ReactComponent as BdayLogo } from '../../../src/assets/icons/main/bday.svg'
import { ReactComponent as Notice } from '../../../src/assets/icons/main/notice.svg'
import styles from '../../../src/assets/style/Main.module.css'
import { ReactComponent as Info } from 'assets/icons/info.svg'


const { Panel } = Collapse

export default function RightMenu() {

  const dispatch = useDispatch()
  const history = useHistory()
  const state = useSelector(state => state.Etc)
  // const [mday, setMday] = useState([])
  const [sysNotice, setSysNotice] = useState([])
  const [wgNotice, setWgNotice] = useState([])

  // 생일관련 상태값
  const [bday, setBday] = useState([])
  const [birthday, setBirthDay] = useState();
  const [birthdaylist, setBirthDayList] = useState([]);

  useEffect(() => {
    dispatch(postAnniversary.call())
    dispatch(postSystemNotice.call())
    dispatch(postWorkgroupNotice.call())
  }, [])

  useEffect(() => {
    if (state.postAnniveraryResponse.length > 0) {
      setBday(state.postAnniveraryResponse[0])
      // setMday(state.postAnniveraryResponse[1])
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

  const handleCommingAnn = () => {
    history.push(`/main/etc/notice/anniversary`)
  }

  const noticeDesc = <p style={{ fontSize: 12, color: '#666666' }}> <Notice />최근 5개 글만 보입니다. </p>
  const NoticeItem = ({ item, onClick }) => (
    <>
      <div
        className={styles.noticeItem}
        onClick={(e, item) => onClick(e, item)} >
        <p style={{
          margin: 0,
          fontWeight: 500,
          fontSize: 14,
          color: '#111111',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: 200
        }}>{item.title}</p>
        <p style={{ color: '#666666', fontSize: 12, marginLeft: 'auto' }}>
          {ConvertDate(item.cre_dt)}
        </p>
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  )

  const DateItem = ({ item, onClick }) => (
    <div
      className={styles.dateItem}
      onClick={onClick}>
      <div style={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
        <p style={{ margin: 0, fontWeight: 500, fontSize: 14, color: '#111111' }}>{item.man_name}</p>
        <p style={{ margin: 0, fontWeight: 400, fontSize: 12, color: '#666666', marginLeft: 5, flexGrow: 2 }}>{item.account_name}</p>
        <p style={{ margin: 0, color: '#666666', fontSize: 12 }}>생일 : {item.days}</p>
      </div>
      <Divider style={{ margin: 0 }} />
    </div>

  )

  function getBirthDayList(List) {
    let result = [];
    for (let i = 0; i < List.length; i++) {
      if (bday[i].today === 'today') {
        result = result.concat(bday[i])
      }
    }
    return result
  }

  useEffect(() => {
    if (bday.length > 0) {
      const today = 'today';
      const List = bday.map(v => v.today);
      if (List.indexOf(today) >= 0) {
        setBirthDay(true);
        setBirthDayList(getBirthDayList(bday))
      }
    }
  }, [bday.length])

  const handleOnGroup = () => {
    history.push('/main/etc/notice/group')
  }

  const handleOnSystem = () => {
    history.push('/main/etc/notice/system')
  }

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#fff',
      borderLeft: 'solid',
      borderWidth: 1,
      borderColor: '#EAEAEA',
    }}>
      <div>
        <Collapse
          defaultActiveKey={['1', '2', '3', '4']}
          bordered={false}
          style={{ backgroundColor: '#fff' }}
          expandIconPosition='right'>
          <Panel header="기념일" key="1" style={customPanelStyle} >
            <div>
              {birthday ?
                <p style={{ fontSize: 12, color: '#666666' }}><BdayLogo /> {`오늘의 생일은 ${bday[0].man_name}님 외 ${birthdaylist.length - 1}명 입니다.`} </p>
                :
                <p onClick={handleCommingAnn} style={{ fontSize: 12, color: '#666666', cursor: 'pointer' }}><BdayLogo /> 다가오는 생일을 확인하세요.</p>
              }
              <div className='mt-1' />
              {birthday &&
                birthdaylist.map(item => (
                  <DateItem key={item.b_idx} item={item} onClick={() => handleAnniversary(item)} />
                ))}
              {/* {state.postAnniveraryResponse &&
                mday.map(item => (
                  <DateItem key={item.b_idx} item={item} onClick={() => handleAnniversary(item)} />
                ))
              } */}
            </div>
          </Panel>
          {/* <Panel header="결혼 기념일" key="2" style={customPanelStyle}>
            <div>
              <p style={{ fontSize: 12, color: '#666666' }}><BdayLogo /> 오늘 기준 7일 내 결혼 기념일만 표시됩니다.</p>
              <div className='mt-1' />
              {state.postAnniveraryResponse &&
                mday.map(item => (
                  <DateItem key={item.b_idx} item={item} onClick={() => handleAnniversary(item)} />
                ))
              }
            </div>
          </Panel> */}
          <Panel header={<>
            <span>워크그룹 공지사항</span>
            <span>&nbsp;</span>
            <Tooltip title="워크그룹 Master가 등록한 공지사항 입니다.">
              <Info />
            </Tooltip>
          </>
          } key="3" style={customPanelStyle}>
            <div>
              {/* {noticeDesc} */}
              {state.postWGResponse &&
                wgNotice.map(item => (
                  <NoticeItem key={item.b_idx} item={item} onClick={() => handleWgNotice(item)} />
                ))
              }
              <div className='mt-1' style={{ float: 'right', cursor: 'pointer' }} onClick={() => handleOnGroup()}>더보기</div>
            </div>
          </Panel>
          <Panel header={<>
            <span>시스템 공지사항</span>
            <span>&nbsp;</span>
            <Tooltip title="세일즈로그 서비스 관리자가 등록한 공지사항 입니다.">
              <Info />
            </Tooltip>
          </>
          } key="4" style={customPanelStyle}>
            <div>
              {/* {noticeDesc} */}
              {state.postSysResponse &&
                sysNotice.map(item => (
                  <NoticeItem key={item.b_idx} item={item} onClick={() => handleSysNotice(item)} />
                ))
              }
              <div className='mt-1' style={{ float: 'right', cursor: 'pointer' }} onClick={() => handleOnSystem()}>더보기</div>

            </div>
          </Panel>
        </Collapse>
      </div>
      {/* <CustomUp /> */}
    </div>
  )
}
