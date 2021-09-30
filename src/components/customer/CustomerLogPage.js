import React, { useEffect, useState } from 'react';
import { Divider, Avatar } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useParams } from 'react-router';
import { getLogLists } from '../../redux/saleslog/actions';
import { ReactComponent as Dot } from '../../assets/icons/main/dot.svg'
import { base64Dec } from '../../constants/commonFunc';
import styles from '../../assets/style/Main.module.css'
import cmm from 'constants/common';
import { ReactComponent as Feedback } from '../.././assets/icons/main/feedback.svg'

const CustomerLogPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const state = useSelector(state => state.SalesLog)
  const loglist = state.loglist

  const [inputs, setInputs] = useState({
    'accts': base64Dec(params.accId),
    'log_gb': '',
    'sales_man': '',
    'sales_lead_gb': '',
    'sales_goal': '',
    'sales_activity': '',
    'accts_man': '',
    'srch': '',
    'pageno': 1,
    'need_cod': ''
  })

  const grayTextStyles = {
    fontSize: 12,
    color: '#333333',
    textOverflow: 'ellipsis',
    display: 'block',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '8.6em',
    lineHeight: '1.8em',
    fontWeight: 300

  }
  useEffect(() => {
    dispatch(getLogLists.call(inputs))

    return () => {
      // 다른곳에서 이동하면 그전 기록이 GET_SALESLOG 에 남아있어서 잠깐 보임 여기서 cleanup...? 
      //ref 로 clear 해보기 
    }
  }, [])

  const handleLogClick = (singleList) => {
    history.push(`/main/manage/saleslog/${singleList.slog_idx}`)
  }

  const CustomerLogItem = ({ singleList }) => (

    <>
      <div className={styles.logWrapper} onClick={() => handleLogClick(singleList)}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Avatar src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + singleList.thumb_url} />
          </div>
          <div style={{ flexGrow: 2 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{singleList.user_name}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#666666', fontWeight: 400 }}>{singleList.dept_fname} { }</p>
            <p style={{ margin: 0, fontSize: 12, color: '#333333', fontWeight: 300 }}>{singleList.sales_goal_t}<Dot /> 대면 <Dot /> 전략 니즈</p>
          </div>
          <div style={{ fontSize: 12, color: '#333333', fontWeight: 400 }}>{singleList.meeting_date} {singleList.meeting_time}</div>
        </div>
        <Divider dashed style={{ marginLeft: 0, marginBottom: 2, marginTop: 4, marginRight: 0 }} />
        <div style={grayTextStyles}>{singleList.account_name} <Dot /> {singleList.man_name} </div>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{singleList.title}</div>
        <div style={grayTextStyles}>{singleList.log} </div>
        <div style={{ display: 'flex', height: 85 }}>
          {(singleList.file1 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file1} />}
          {(singleList.file2 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file2} />}
          {(singleList.file3 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file3} />}
          {(singleList.file4 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file4} />}
          {(singleList.file5 !== '') && <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className='mr-1' shape='square' src={cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + singleList.file5} />}
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#333333',
            fontWeight: 400,

          }}>
          <Feedback /> 피드백 {singleList.feedback_cnt}개</div>
      </div>
      <Divider style={{ marginTop: 10, marginBottom: 10, marginLeft: 0, marginRight: 0 }} />
    </>


  )

  const handleNextPage = () => {

  }

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={10}
      next={handleNextPage}>
      <div>
        {
          loglist && state.loglistcount != 0 ?
            loglist.map((singleList, index) =>
              <CustomerLogItem singleList={singleList} key={singleList.slog_idx} />
            ) : <div style={{ fontSize: 14, fontWeight: 500, textAlign: 'center' }}>해당 고객사로 등록된 일지가 없습니다.</div>
        }

      </div>
    </InfiniteScroll>
  );
}

export default CustomerLogPage;
